package com.tennis.world.league.service;

import java.util.List;

import com.tennis.world.member.vo.MemberVO;

public interface LeagueService {
	List<MemberVO> getRankList(String tierCode);

}
