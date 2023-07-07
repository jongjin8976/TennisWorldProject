package com.tennis.world.league.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tennis.world.member.vo.MemberVO;

@Service("leagueService")
public class LeagueServiceImpl implements LeagueService{
	@Autowired
	private SqlSessionTemplate sqlsession;
	
	//랭킹 리스트
	@Override
	public List<MemberVO> getRankList(String tierCode) {
		return sqlsession.selectList("leagueMapper.getRankList",tierCode);
	}

}
