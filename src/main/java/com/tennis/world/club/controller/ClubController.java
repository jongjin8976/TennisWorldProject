package com.tennis.world.club.controller;

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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tennis.world.club.service.ClubService;
import com.tennis.world.club.vo.ClubVO;
import com.tennis.world.member.service.MemberService;
import com.tennis.world.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/club")
public class ClubController {
	@Resource(name = "clubService")
	private ClubService clubService;
	@Resource(name = "memberService")
	private MemberService memberService;
	
	//클럽 등록 페이지 이동
	@GetMapping("/createClubForm")
	public String createClubForm () {
		
		return "content/club/create_club_form";
	}
	
	//클럽명 검증
	@PostMapping("/checkByClubNameAjax")
	@ResponseBody
	public int checkByClubNameAjax(String clubName) {
		return clubService.checkByClubName(clubName);
	}
	//클럽장의 클럽생성 가능 여부 확인
	@PostMapping("/checkClubValiByMemberAjax")
	@ResponseBody
	public int checkClubValiByMemberAjax(Authentication authentication) {
		return clubService.checkCountClubCode(authentication.getName());
	}
	
	
	//클럽 등록
	@PostMapping("/createClubAjax")
	@ResponseBody
	public int createClubAjax(ClubVO clubVO, Authentication authentication) {
		String clubCode = clubService.getNextClubCode();
		String memberId = authentication.getName();	
		clubVO.setClubCode(clubCode);
		clubVO.setClubLeader(memberId);
		System.out.println("data = " + clubVO);

		return clubService.createClub(clubVO);
	}
	
	//클럽 리스트 조회 페이지
	@GetMapping("/clubList")
	public String clubList(Model model) {
		model.addAttribute("clubList", clubService.getClubList(""));
		return "content/club/club_list";
	}
	
	//클럽상세정보
	@PostMapping("/getClubDetailAjax")
	@ResponseBody
	@JsonIgnore
	public Map<String, Object> getClubDetailAjax(String clubCode) {
		Map<String, Object> clubMap = new HashMap<>();
		clubMap.put("clubDetail", clubService.getClubList("CLUB_001"));
		clubMap.put("clubMemList", clubService.getClubMemberList("CLUB_001"));
		
		return clubMap;
	}
	
	//클럽가입 중복 조회
	@PostMapping("/joinByDuplicationAjax")
	@ResponseBody
	public int joinByDuplicationAjax(MemberVO memberVO) {
		return clubService.joinByDuplication(memberVO);
	}
	
	//클럽가입
	@PostMapping("/joinClubAjax")
	@ResponseBody
	public int joinClubAjax(MemberVO memberVO) {
		return clubService.joinClub(memberVO);
	}
	
	//클럽회원관리
	@PostMapping("/clubMemberManageAjax")
	@ResponseBody
	public List<MemberVO> clubMemberManageAjax(String clubCode) {
		return memberService.getClubMemberList(clubCode);
	}
	
	//회원 강퇴
	@PostMapping("/dropOutMemberAjax")
	@ResponseBody
	public int dropOutMemberAjax(MemberVO memberVO) {
		return clubService.dropOutClubByMember(memberVO);
	}
	
	//클럽 탈퇴
	@PostMapping("/clubSecessionAjax")
	@ResponseBody
	public int clubSecessionAjax(MemberVO memberVO) {
		return clubService.dropOutClubByMember(memberVO);
	}
	
	
}
