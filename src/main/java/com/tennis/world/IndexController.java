package com.tennis.world;




import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


import com.tennis.world.match.service.MatchService;
import com.tennis.world.member.service.MemberService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;

@Controller
public class IndexController {
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Resource(name = "matchService")
	private MatchService matchService;
	
	//시작
	@GetMapping("/")
	public String index(Authentication authentication,HttpSession session, Model model) {
		String path = "";
		
		if(authentication == null) {
			path = "content/member/main_page";
		}
		else {
			String user = (String)authentication.getName();			
			session.setAttribute("memberName", memberService.getMemName(user));
			path = "content/member/main_page";
			
		}
		//매칭 리스트, 매칭결과
		model.addAttribute("matchList",matchService.getMatchList());
		model.addAttribute("resultList", matchService.getResultList());
		model.addAttribute("doubleList", matchService.getResultByDoubleList());
		return path;
	}
	
	
	
	
	

}
