package com.tennis.world.match.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tennis.world.admin.vo.MatchResultVO;
import com.tennis.world.match.vo.CourtVO;
import com.tennis.world.match.vo.MatchVO;
import com.tennis.world.match.vo.PlaceVO;
import com.tennis.world.match.vo.TierVO;
import com.tennis.world.match.vo.TypeVO;
import com.tennis.world.member.vo.MemberVO;

@Service("matchService")
public class MatchServiceImpl implements MatchService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public List<TierVO> getTierList() {
		return sqlsession.selectList("matchMapper.getTierList");
	}

	@Override
	public List<TypeVO> getTypeList() {
		return sqlsession.selectList("matchMapper.getTypeList");
	}

	@Override
	public List<PlaceVO> getPlaceList() {
		return sqlsession.selectList("matchMapper.getPlaceList");
	}

	@Override
	public List<CourtVO> getCourtList(String placeNo) {
		return sqlsession.selectList("matchMapper.getCourtList",placeNo);
	}

	@Override
	public int checkMatchByCondition(MatchVO matchVO) {
		return sqlsession.selectOne("matchMapper.checkMatchByCondition",matchVO);
	}

	@Override
	public void regMatch(MatchVO matchVO) {
		sqlsession.insert("matchMapper.regMatch",matchVO);
		
	}

	@Override
	public List<MatchVO> getMatchList() {
		return sqlsession.selectList("matchMapper.getMatchList");
	}

	@Override
	public MatchVO getMatchInfo(String matchCode) {
		return sqlsession.selectOne("matchMapper.getMatchInfo", matchCode);
	}

	@Override
	public List<String> getNameList(MemberVO memberVO) {
		return sqlsession.selectList("matchMapper.getNameList", memberVO);
	}

	@Override
	public List<String> getTierCodeList(MemberVO memberVO) {
		return sqlsession.selectList("matchMapper.getTierCodeList",memberVO);
	}

	@Override
	public List<String> getTierNameList(TierVO tierVO) {
		return sqlsession.selectList("matchMapper.getTierNameList",tierVO);
	}

	@Override
	public String valifyTier(String memberId) {
		return sqlsession.selectOne("matchMapper.valifyTier",memberId);
	}

	@Override
	public String valifyMatch(String matchCode) {
		return sqlsession.selectOne("matchMapper.valifyMatch",matchCode);
	}

	@Override
	public int regMatchMember2(MatchVO matchVO) {
		return sqlsession.update("matchMapper.regMatchMember2",matchVO);
	}

	@Override
	public int valifyPlayer(String matchCode) {
		return sqlsession.selectOne("matchMapper.valifyPlayer",matchCode);
	}

	@Override
	public int valifyPlayerByDoubles(String matchCode) {
		return sqlsession.selectOne("matchMapper.valifyPlayerByDoubles",matchCode);
	}

	@Override
	public int valifyPlayer3(String matchCode) {
		return sqlsession.selectOne("matchMapper.valifyPlayer3",matchCode);
	}

	@Override
	public int regMatchMember3(MatchVO matchVO) {
		return sqlsession.update("matchMapper.regMatchMember3",matchVO);
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public int regMatchMember4(MatchVO matchVO) {
		sqlsession.update("matchMapper.regMatchMember4",matchVO);
		return sqlsession.update("matchMapper.setDeadLine");
	}

	@Override
	public void setDeadLine() {
		sqlsession.update("matchMapper.setDeadLine");
	}

	@Override
	public List<MatchResultVO> getResultList() {
		return sqlsession.selectList("matchMapper.getResultList");
	}

	@Override
	public List<MatchResultVO> getResultByDoubleList() {
		return sqlsession.selectList("matchMapper.getResultByDoubleList");
	}

	@Override
	public int deleteMatch(String matchCode) {
		return sqlsession.delete("matchMapper.deleteMatch", matchCode);
	}

	@Override
	public int valiCountPlayer(MatchVO matchVO) {
	    return sqlsession.selectOne("matchMapper.valiCountPlayer", matchVO);
	}

	@Override
	public MatchVO getMatchPlayerList(String matchCode) {
		return sqlsession.selectOne("matchMapper.getMatchPlayerList",matchCode);
	}

	@Override
	public int cancelMatchByPlayer(MatchVO matchVO) {
		return sqlsession.update("matchMapper.cancelMatchByPlayer",matchVO);
	}

	@Override
	public String getMyTierCode(String memberId) {
		return sqlsession.selectOne("matchMapper.getMyTierCode",memberId);
	}

	@Override
	public List<Integer> getMemberCodeList(MemberVO memberVO) {
		return sqlsession.selectList("matchMapper.getMemberCodeList",memberVO);
	}

	@Override
	public String getMemberIdByRandom(int memberCode) {
		return sqlsession.selectOne("matchMapper.getMemberIdByRandom",memberCode);
	}

	@Override
	public int getCheckRandomMatch(MatchVO matchVO) {
		return sqlsession.selectOne("matchMapper.getCheckRandomMatch",matchVO);
	}

	@Override
	public int valiPlayer2ByRandom(MatchVO matchVO) {
		return sqlsession.selectOne("matchMapper.valiPlayer2ByRandom",matchVO);
	}

	@Override
	public MatchVO getPlayerList(String matchCode) {
		return sqlsession.selectOne("matchMapper.getPlayerList",matchCode);
	}


	
	
	
}
