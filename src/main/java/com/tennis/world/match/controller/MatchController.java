package com.tennis.world.match.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tennis.world.match.service.MatchService;
import com.tennis.world.match.vo.CourtVO;
import com.tennis.world.match.vo.MatchVO;
import com.tennis.world.match.vo.TierVO;
import com.tennis.world.member.service.MemberService;
import com.tennis.world.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/match")
public class MatchController {
	@Resource(name = "matchService")
	private MatchService matchService;
	@Resource(name = "memberService")
	private MemberService memberService;

	// 매칭 페이지 이동
	@GetMapping("/regMatchForm")
	public String regMatchForm(Model model, Authentication authentication) {
		String placeNo = "PLA_001";
		model.addAttribute("tierList", matchService.getTierList());
		model.addAttribute("typeList", matchService.getTypeList());
		model.addAttribute("placeList", matchService.getPlaceList());
		model.addAttribute("courtList", matchService.getCourtList(placeNo));

		String memberId = authentication.getName();

		model.addAttribute("memberTier", memberService.getMemTier(memberId));

		return "/content/match/reg_match";
	}

	// placeNo에 따른 court코드 넘기기
	@PostMapping("/getCourtAjax")
	@ResponseBody
	public List<CourtVO> getCourtAjax(String placeNo) {

		return matchService.getCourtList(placeNo);
	}

	// 중복 여부 조회
	@PostMapping("/checkCourtAjax")
	@ResponseBody
	public int checkCourtAjax(MatchVO matchVO) {
		System.out.println("matchVO = " + matchVO);
		return matchService.checkMatchByCondition(matchVO);
	}

	// 매칭 등록
	@PostMapping("/insertMatch")
	public String insertMatch(MatchVO matchVO, Authentication authentication) {
		String matchReader = authentication.getName();
		matchVO.setMatchWriter(matchReader);
		matchVO.setPlayer1(matchReader);
		matchService.regMatch(matchVO);
		return "redirect:/";
	}

	// 매칭 상세정보
	@PostMapping("/matchDetailAjax")
	@ResponseBody
	public Map<String, Object> matchDetailAjax(String matchCode) {
		System.out.println(matchCode);
		Map<String, Object> matchMap = new HashMap<>();
		MatchVO matchVO = matchService.getMatchInfo(matchCode);

		matchMap.put("matchData", matchVO);

		List<String> memIdList = new ArrayList<>();
		System.out.println("matchVO : " + matchVO);
		memIdList.add(0, matchVO.getPlayer1());

		if (matchVO.getPlayer2() != null) {
			memIdList.add(1, matchVO.getPlayer2());
		}
		else if(matchVO.getPlayer2() == null) {
			memIdList.add(1, "");
		}
		if (matchVO.getPlayer3() != null) {
			memIdList.add(2, matchVO.getPlayer3());
		}
		else if(matchVO.getPlayer3() == null) {
			memIdList.add(2, "");
		}
		if (matchVO.getPlayer4() != null) {
			memIdList.add(3, matchVO.getPlayer4());
		}
		if (matchVO.getPlayer4() == null) {
			memIdList.add(3, "");
		}

		MemberVO memberVO = new MemberVO();

		memberVO.setMemIdList(memIdList);

		List<String> nameList = matchService.getNameList(memberVO);
		matchMap.put("nameList", nameList);
		
		TierVO tierVO = new TierVO();

		List<String> tierList = matchService.getTierCodeList(memberVO);
		tierVO.setTierList(tierList);

		List<String> tierNameList = matchService.getTierNameList(tierVO);
		matchMap.put("tierNameList", tierNameList);

		return matchMap;
	}

	// 매칭 신청 티어 검증
	@PostMapping("/valifyJoinAjax")
	@ResponseBody
	public boolean valifyJoinAjax(String matchCode, Authentication authentication) {
		boolean valiResult = true;

		String memberId = authentication.getName();

		String memberTier = matchService.valifyTier(memberId);
		String matchTier = matchService.valifyMatch(matchCode);
		try {
			if (Integer.parseInt(matchTier.substring(7)) < Integer.parseInt(memberTier.substring(7))) {
				valiResult = false;
			}

		} catch (StringIndexOutOfBoundsException e) {
			System.out.println("Error : " + e.getMessage());
		}

		return valiResult;
	}

	// 단식 선수 검증
	@PostMapping("/valifyPlayerAjax")
	@ResponseBody
	public int valifyPlayerAjax(String matchCode) {
		// 2번이 비었냐?
		return matchService.valifyPlayer(matchCode);
	}

	// 복식 선수 검증
	@PostMapping("/valifyPlayerByDoublesAjax")
	@ResponseBody
	public int valifyPlayerByDoublesAjax(String matchCode) {
		// 4번이 비었냐?
		return matchService.valifyPlayerByDoubles(matchCode);
	}

	// 단식 선수 등록
	@PostMapping("/regMatchMemberAjax")
	@ResponseBody
	public int regMatchMemberAjax(Authentication authentication, MatchVO matchVO) {
		matchVO.setPlayer2(authentication.getName());
		matchService.setDeadLine();
		return matchService.regMatchMember2(matchVO);
	}

	// 복식 선수 등록
	@PostMapping("/regMatchMemberDoublesAjax")
	@ResponseBody
	public int regMatchMemberDoublesAjax(Authentication authentication, String matchCode) {
		int playerNum = 0;
		// 매치코드 조회를 해서 2,3,4 있으면 1씩 저장 없으면
		int playerResult2 = matchService.valifyPlayer(matchCode);
		int playerResult3 = matchService.valifyPlayer3(matchCode);
		int playerResult4 = matchService.valifyPlayerByDoubles(matchCode);
		MatchVO matchVO = new MatchVO();
		matchVO.setMatchCode(matchCode);

		if (playerResult2 == 0) {
			matchVO.setPlayer2(authentication.getName());
			matchService.regMatchMember2(matchVO);
			playerNum = 2;
		} else if (playerResult3 == 0) {
			matchVO.setPlayer3(authentication.getName());
			matchService.regMatchMember3(matchVO);
			playerNum = 3;
		} else if (playerResult4 == 0) {
			matchVO.setPlayer4(authentication.getName());
			matchService.regMatchMember4(matchVO);
			playerNum = 4;
		}
		MatchVO playerList = matchService.getPlayerList(matchCode);
		if(playerList.getPlayer2() != null || playerList.getPlayer3() != null || playerList.getPlayer4() != null) {
			matchService.setDeadLine();
		}

		return playerNum;
	}

	// 매칭 취소
	@PostMapping("/deleteMatchAjax")
	@ResponseBody
	public int deleteMatchAjax(String matchCode) {
		return matchService.deleteMatch(matchCode);
	}

	// 참가 취소 검증
	@PostMapping("/validateCancelMatchAjax")
	@ResponseBody
	public int validateCancelMatchAjax(String matchCode, String memberId) {
		MatchVO matchVO = new MatchVO();
		MemberVO memberVO = new MemberVO();
		memberVO.setMemberId(memberId);
		matchVO.setMatchCode(matchCode);
		matchVO.setMemberVO(memberVO);
		return matchService.valiCountPlayer(matchVO);
	}

	// 참가 취소
	@PostMapping("/cancelMatchAjax")
	@ResponseBody
	public int cancelMatchAjax(String matchCode, String memberId) {
		List<String> playerList = new ArrayList<>();
		MatchVO playerData = matchService.getMatchPlayerList(matchCode);
		playerList.add(playerData.getPlayer2());
		playerList.add(playerData.getPlayer3());
		playerList.add(playerData.getPlayer4());

		int playerNum = playerList.indexOf(memberId);
		String player = "PLAYER_";
		String playerCode = player + (playerNum + 2);
		MatchVO matchVO = new MatchVO();
		matchVO.setMatchCode(matchCode);
		matchVO.setPlayerCode(playerCode);

		return matchService.cancelMatchByPlayer(matchVO);
	}

	// 랜덤 매칭 페이지 이동
	@GetMapping("/randomMatchForm")
	public String randomMatchForm() {

		return "content/match/random_match_form";
	}

	// 랜덤 매칭 검증
	@PostMapping("/valiRandomMatchPlayerAjax")
	@ResponseBody
	public boolean getRandomMatchPlayerAjax(String memberId) {
		MatchVO matchVO = new MatchVO();
		Date dt = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		cal.add(Calendar.DATE, 1);
		dt = cal.getTime();

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String matchDate = format.format(dt);
		matchVO.setMatchWriter(memberId);
		matchVO.setMatchDate(matchDate);

		int chkResult = matchService.getCheckRandomMatch(matchVO);
		if (chkResult == 0) {
			return true;
		} else {
			return false;
		}
	}

	// 랜덤 매칭 진행
	@PostMapping("/regRandomMatchPlayerAjax")
	@ResponseBody
	public boolean regRandomMatchPlayerAjax(String memberId) {
		boolean regMatchResult = false;
		MatchVO matchVO = new MatchVO();
		Date dt = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		cal.add(Calendar.DATE, 1);
		dt = cal.getTime();

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		String matchDate = format.format(dt);
		matchVO.setMatchWriter(memberId);
		matchVO.setMatchDate(matchDate);
		matchVO.setStartTime("19:00");
		matchVO.setEndTime("20:00");
		MemberVO memberVO = new MemberVO();
		String myTier = matchService.getMyTierCode(memberId);
		memberVO.setMemberId(memberId);
		int myNum = Integer.parseInt(myTier.substring(7));
		List<String> tierList = new ArrayList<>();
		String tier = "TIER_00";
		String firstTier = "";
		String secondTier = "";
		String thirdTier = "";
		String fourthTier = "";

		if (myNum == 8) {
			firstTier = tier + (myNum + 1);
			secondTier = myTier;
			thirdTier = tier + (myNum - 1);
			fourthTier = tier + (myNum - 2);

		} else if (myNum == 9) {
			firstTier = myTier;
			secondTier = myTier;
			thirdTier = tier + (myNum - 1);
			fourthTier = tier + (myNum - 2);
		}

		else if (myNum == 1) {
			firstTier = tier + (myNum + 1);
			secondTier = tier + (myNum + 2);
			thirdTier = myTier;
			fourthTier = myTier;
		} else if (myNum == 2) {
			firstTier = tier + (myNum + 1);
			secondTier = tier + (myNum + 2);
			thirdTier = tier + (myNum - 1);
			fourthTier = myTier;
		} else {
			firstTier = tier + (myNum + 1);
			secondTier = tier + (myNum + 2);
			thirdTier = tier + (myNum - 1);
			fourthTier = tier + (myNum - 2);
		}

		tierList.add(0, firstTier);
		tierList.add(1, secondTier);
		tierList.add(2, thirdTier);
		tierList.add(3, fourthTier);
		tierList.add(4, myTier);
		memberVO.setTierList(tierList);

		List<Integer> codeList = matchService.getMemberCodeList(memberVO);
		if (codeList.size() != 0) {
			boolean valiResult = true;
			String randomId = "";
			int valiIdx = 0;
			while (valiResult) {
				int memberCode = (int) (Math.random() * codeList.size());
				System.out.println("랜덤 코드 : " + memberCode);
				randomId = matchService.getMemberIdByRandom(codeList.get(memberCode));
				matchVO.setPlayer2(randomId);
				int valifiyNumber = matchService.valiPlayer2ByRandom(matchVO);
				if (valifiyNumber == 0) {
					valiResult = false;
				} else {
					valiIdx += 1;
					System.out.println("INDEX : " + valiIdx);
					valiResult = true;
				}
			}

			if (randomId != null) {
				boolean matResult = true;
				int idx = 0;
				while (matResult) {
					int randomCourt = (int) (Math.random() * 9) + 10;
					String randomCourtCode = "CO_0" + randomCourt;
					System.out.println(randomCourtCode);
					matchVO.setMatchType("TYPE_001");
					matchVO.setPlaceNo("PLA_003");
					matchVO.setPlayer1(memberId);
					matchVO.setCourtNo(randomCourtCode);
					matchVO.setMatchTier(secondTier);
					matchVO.setMatchIntro("랜덤 매칭입니다.");
					matchVO.setPlayer2(randomId);
					matchVO.setIsDeadLine("Y");
					int matResultCnt = matchService.checkMatchByCondition(matchVO);
					if (matResultCnt == 1) {
						matResult = true;
						idx++;
						if (idx == 50) {
							matResult = false;
							regMatchResult = false;
						}
					} else {
						matResult = false;
						matchService.regMatch(matchVO);
						regMatchResult = true;
					}
				}

			} else {
				regMatchResult = false;
			}

			return regMatchResult;
		}
		else {
			return false;
		}
	}

}
