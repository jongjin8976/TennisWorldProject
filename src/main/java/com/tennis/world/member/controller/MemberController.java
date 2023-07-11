package com.tennis.world.member.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tennis.world.admin.service.AdminService;
import com.tennis.world.club.service.ClubService;
import com.tennis.world.member.service.MemberService;
import com.tennis.world.member.vo.AdvanceVO;
import com.tennis.world.member.vo.MemImgVO;
import com.tennis.world.member.vo.MemberVO;
import com.tennis.world.util.ConstVariable;
import com.tennis.world.util.UploadUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/member")
public class MemberController {
	@Resource(name = "memberService")
	private MemberService memberService;
	@Resource(name = "clubService")
	private ClubService clubService;
	@Autowired
	private PasswordEncoder encoder;
	@Resource(name = "adminService")
	private AdminService adminService;
	
	
	//아이디 체크
	@RequestMapping("/idChkAjax")
	@ResponseBody
	public int idChkAjax(String memberId) {
		System.out.println("memberId = " + memberId);
		
		return memberService.chkCntId(memberId);
	
	}
	//회원가입
	@PostMapping("/joinMember")
	public String joinMember(MemberVO memberVO) {
		String inputPassword = encoder.encode(memberVO.getMemberPw());
		memberVO.setMemberPw(inputPassword);
		memberService.regMember(memberVO);
		return "redirect:/";
	}
	
	//로그인 페이지
	@GetMapping("/loginForm")
	public String loginForm() {
		
		return "content/member/login_form";
	}
	
	//내정보 페이지
	@GetMapping("/myInfoForm")
	public String myInfoForm(Authentication authentication, Model model) {
		Map<String, Object> infoMap = new HashMap<>();

		String memberId = authentication.getName();
		MemberVO memberVO = memberService.getMyInfo(memberId);
		infoMap.put("myInfo", memberVO);
		infoMap.put("winningData", memberService.getWinningData(memberId));
		infoMap.put("loseData", memberService.getLoseData(memberId));
		infoMap.put("blackReason", adminService.getMemberByBlackReason(memberId));
		infoMap.put("memImg", memberService.getMemImg(memberId));
		if(memberVO.getClubCode() != null) {
			infoMap.put("clubName", memberService.getClubNameForMember(memberVO.getClubCode()));		
		}
		
		model.addAttribute("infoMap",infoMap);
		return "content/member/my_info_form";
	}
	
	//이력 확인
	@PostMapping("/checkRequestAdAjax")
	@ResponseBody
	public int checkRequestAdAjax(Authentication authentication) {
		String memberId = authentication.getName();	
		return memberService.checkRequest(memberId);
	}
	
	
	//승급 신청 검증
	@PostMapping("/requestAdvanceValiAjax")
	@ResponseBody
	public boolean requestAdvanceValiAjax(Authentication authentication) {
		String memberId = authentication.getName();
		boolean valiResult = false;
		MemberVO memberVO = memberService.getMyInfo(memberId);
		if(memberVO.getMemPoint() >= 100) {
			valiResult = true;
		}
		return valiResult;
	}
	
	//승급 신청
	@PostMapping("/requestAdvanceAjax")
	@ResponseBody
	public int requestAdvanceAjax(Authentication authentication) {
		AdvanceVO advanceVO = new AdvanceVO();
		String memberId = authentication.getName();
		MemberVO memberVO = memberService.getMyInfo(memberId);
		String tierCode = memberVO.getTierCode();
		int beforNum = Integer.parseInt(tierCode.substring(6));
		int afterNum = beforNum + 1;
		String afterTierCode = "TIER_00" + afterNum;
		advanceVO.setMemberId(memberId);
		advanceVO.setMemPoint(memberVO.getMemPoint());
		advanceVO.setBeforTierCode(tierCode);
		advanceVO.setAfterTierCode(afterTierCode);
		
		return memberService.requestAdvancement(advanceVO);
		
	}
	
	//이미지 등록
	@PostMapping("/regMemImg")
	@ResponseBody
	public boolean regMemImg(Authentication authentication, MultipartFile img) {
		boolean imgResult = false;
		MemImgVO memImgVO = UploadUtil.uploadFile(img);
		memImgVO.setMemberId(authentication.getName());
		MemImgVO memImgData = memberService.countByMemberId(authentication.getName());
		if(memImgData != null) {
			memberService.deleteMemImg(authentication.getName());
			memberService.regMemImg(memImgVO);
			File file = new File(ConstVariable.UPLOAD_PATH + memImgData.getAttachedFileName());
			System.out.println(file);
			file.delete();
			imgResult = true;
		}
		else {
			memberService.regMemImg(memImgVO);
			imgResult = true;
		}
		return imgResult;
	}
	

}
