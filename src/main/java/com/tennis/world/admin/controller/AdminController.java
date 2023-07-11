package com.tennis.world.admin.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tennis.world.admin.service.AdminService;
import com.tennis.world.admin.vo.BlackListVO;
import com.tennis.world.admin.vo.MatchResultVO;
import com.tennis.world.match.service.MatchService;
import com.tennis.world.match.vo.MatchVO;
import com.tennis.world.member.vo.AdvanceVO;
import com.tennis.world.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource(name = "adminService")
	private AdminService adminService;
	@Resource(name = "matchService")
	private MatchService matchService;
	
	
	//경기 완료 목록 페이지
	@RequestMapping("/regMatchResultForm")
	public String regMatchResultForm(Model model, MatchVO matchVO) {
		model.addAttribute("matchList",adminService.getDateByMatchResult(matchVO));
		return "content/admin/match_result_form";
	}
	
	//날짜별 검색
	@RequestMapping("/getMonthByResultAjax")
	@ResponseBody
	public List<MatchVO> getMonthByResultAjax(MatchVO matchVO) {
		return adminService.getDateByMatchResult(matchVO);
	}
	
	//경기 결과 등록
	@PostMapping("/regMatchResult")
	public String regMatchResult(MatchResultVO matchResultVO) {
		int winnerSumScore = 0;
		int loserSumScore = 0;

		winnerSumScore += matchResultVO.getFirstSetScoreP1();
		winnerSumScore += matchResultVO.getSecondSetScoreP1();
		winnerSumScore += matchResultVO.getThirdSetScoreP1();
		winnerSumScore += matchResultVO.getFourthSetScoreP1();
		winnerSumScore += matchResultVO.getFifthSetScoreP1();
		
		matchResultVO.setWinnerScore(winnerSumScore);
		
		loserSumScore += matchResultVO.getFirstSetScoreP2();
		loserSumScore += matchResultVO.getSecondSetScoreP2();
		loserSumScore += matchResultVO.getThirdSetScoreP2();
		loserSumScore += matchResultVO.getFourthSetScoreP2();
		loserSumScore += matchResultVO.getFifthSetScoreP2();
		
		matchResultVO.setLoserScore(loserSumScore);
		
		adminService.regMatchResult(matchResultVO);
		
		return "redirect:/admin/regMatchResultForm";
	}
	
	//승급요청 목록 페이지
	@GetMapping("/advancementRequestForm")
	public String advancementRequestForm(Model model) {
		model.addAttribute("advanList", adminService.getAdvanList());
		return "content/admin/advan_list_form";
	}
	
	//승급 승인
	@PostMapping("/setRequestAjax")
	@ResponseBody
	public int setRequestAjax(String reqCode) {
		AdvanceVO advanceVO = adminService.getAdvanDetail(reqCode);
		return adminService.setMemTier(advanceVO);
	}
	
	//블랙리스트 관리 페이지
	@RequestMapping("/regBlackListForm")
	public String regBlackListForm(Model model, MemberVO memberVO) {
		model.addAttribute("memberList",adminService.getBlackList(memberVO));
		return "content/admin/reg_black_list_form";
	}
	
	//블랙리스트 검색
	@PostMapping("/getSearchValueAjax")
	@ResponseBody
	public List<MemberVO> getSearchValueAjax(MemberVO memberVO){
		return adminService.getBlackList(memberVO);
	}
	
	//블랙리스트 등록하기
	@PostMapping("/regBlackListAjax")
	@ResponseBody
	public int regBlackListAjax(BlackListVO blackListVO) {
		int warningCnt = 0;
		int blackPoint = adminService.getMemberBlackCnt(blackListVO.getMemberId());
		int resultCnt = adminService.regBlackList(blackListVO);
		if(blackPoint == 2) {
			warningCnt += blackPoint;
			adminService.expulsionByMember(blackListVO.getMemberId());
		}
		else {
			warningCnt += resultCnt;
		}
		System.out.println("blackPoint : "+ blackPoint);
		System.out.println("warningCnt : "+ warningCnt);
		System.out.println("resultCnt : "+ resultCnt);
		return warningCnt;
	}
	
	//회원의 블랙리스트 누적 사유 확인
	@PostMapping("/getBlackReasonListAjax")
	@ResponseBody
	public List<BlackListVO> getBlackReasonListAjax(String memberId){		
		return adminService.getMemberByBlackReason(memberId);
	}
	
	//블랙리스트 사유 취소(완료)
	//해야할 것 (7/7)
	//스프링 시큐리티 DisabledException 
	//UserDetailServiceImpl에 있는 내용 예외처리 어떻게 할 지 찾아봐야함
	//블랙리스트 처리는 완료 하였고 
	//내정보 페이지에서 이력 확인 할 수 있게 할지? 고민 oo
	//내정보 페이지에 이미지 넣게 만들지? 고민 완료
	//공지사항 페이지 만들어야 함///
	@PostMapping("/cancelRegBlackListAjax")
	@ResponseBody
	public int cancelRegBlackListAjax(BlackListVO blackListVO) {
		int resultCnt = adminService.getMemberBlackCnt(blackListVO.getMemberId());
		
		if(resultCnt == 3) {
			adminService.deleteBlackCode(blackListVO);
			adminService.setMemStateByBlack(blackListVO.getMemberId());			
		}
		else {
			adminService.deleteBlackCode(blackListVO);
		}
		
		return resultCnt;
	}
	
}
