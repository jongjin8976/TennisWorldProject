package com.tennis.world.club.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tennis.world.club.vo.ClubVO;
import com.tennis.world.member.vo.MemberVO;

@Service("clubService")
public class ClubServiceImpl implements ClubService{
	@Autowired
	private SqlSessionTemplate sqlsession;
	//다음에 들어갈 클럽코드 조회
	@Override
	public String getNextClubCode() {
		return sqlsession.selectOne("clubMapper.getNextClubCode");
	}
	//클럽명 중복조회
	@Override
	public int checkByClubName(String clubName) {
		return sqlsession.selectOne("clubMapper.checkByClubName",clubName);
	}
	//클럽 등록 및 클럽장 정보 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int createClub(ClubVO clubVO) {
		sqlsession.insert("clubMapper.createClub",clubVO);
		return sqlsession.update("clubMapper.setMemberByClubData",clubVO);
	}
	//클럽리스트 조회
	@Override
	public List<ClubVO> getClubList(String clubCode) {
		return sqlsession.selectList("clubMapper.getClubList",clubCode);
	}
	//클럽 회원목록 조회
	@Override
	public List<MemberVO> getClubMemberList(String clubCode) {
		return sqlsession.selectList("clubMapper.getClubMemberList",clubCode);
	}
	//클럽 가입 중복조회
	@Override
	public int joinByDuplication(MemberVO memberVO) {
		return sqlsession.selectOne("clubMapper.joinByDuplication",memberVO);
	}
	//클럽 가입
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int joinClub(MemberVO memberVO) {
		sqlsession.update("clubMapper.joinClub",memberVO);
		return sqlsession.update("clubMapper.setClubHeadCount",memberVO.getClubCode());
	}
	//클럽 회원 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int dropOutClubByMember(MemberVO memberVO) {
		sqlsession.update("clubMapper.dropOutClubByMember",memberVO.getMemberId());
		return sqlsession.update("clubMapper.dropOutBySetHeadCount",memberVO.getClubCode());
	}
	//클럽생성 가능여부 확인
	@Override
	public int checkCountClubCode(String memberId) {
		return sqlsession.selectOne("clubMapper.checkCountClubCode",memberId);
	}

	
	
}
