package com.tennis.world.league.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tennis.world.league.service.LeagueService;
import com.tennis.world.match.service.MatchService;
import com.tennis.world.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/league")
public class LeagueController {
	@Resource(name = "leagueService")
	private LeagueService leagueService;
	@Resource(name ="matchService")
	private MatchService matchService;
	
	//랭킹페이지
	@GetMapping("/rankingPage")
	public String rankingPage(String tierCode, Model model) {
		if(tierCode == null) {
			model.addAttribute("rankList",leagueService.getRankList("TIER_001"));
		}
		model.addAttribute("tierList",matchService.getTierList());
		return "content/league/ranking_page";
	}
	
	//랭킹 티어별 셀렉트
	@PostMapping("/selectTierCodeByRankAjax")
	@ResponseBody
	public List<MemberVO> selectTierCodeByRankAjax(String tierCode) {
		return leagueService.getRankList(tierCode);
	}
	
	
}
