package com.tennis.world.member.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tennis.world.member.vo.AdvanceVO;
import com.tennis.world.member.vo.MemImgVO;
import com.tennis.world.member.vo.MemberVO;

@Service("memberService")
public class MemberServiceImpl implements MemberService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public int chkCntId(String memberId) {
		return sqlsession.selectOne("memberMapper.chkCntId",memberId);
	}

	//회원가입
	@Override
	public void regMember(MemberVO memberVO) {
		sqlsession.insert("memberMapper.regMember",memberVO);
	}
	
	//로그인
	@Override
	public MemberVO login(String memId) {
		return sqlsession.selectOne("memberMapper.login", memId);
		
	}
	//이름 가져오기
	@Override
	public String getMemName(String memberId) {
		return sqlsession.selectOne("memberMapper.getMemName",memberId);
	}
	
	//티어 가져오기
	@Override
	public String getMemTier(String memberId) {
		return sqlsession.selectOne("memberMapper.getMemTier",memberId);
	}
	
	//내정보 가져오기
	@Override
	public MemberVO getMyInfo(String memberId) {
		return sqlsession.selectOne("memberMapper.getMyInfo",memberId);
	}
	//승리 데이터
	@Override
	public int getWinningData(String memberId) {
		return sqlsession.selectOne("memberMapper.getWinningData",memberId);
	}
	//패배 데이터
	@Override
	public int getLoseData(String memberId) {
		return sqlsession.selectOne("memberMapper.getLoseData",memberId);
	}
	//클럽 이름 조회
	@Override	
	public String getClubNameForMember(String clubCode) {
		return sqlsession.selectOne("memberMapper.getClubNameForMember",clubCode);
	}
	//클럽 회원 리스트 조회
	@Override
	public List<MemberVO> getClubMemberList(String clubCode) {
		return sqlsession.selectList("memberMapper.getClubMemberList",clubCode);
	}
	//승급신청
	@Override
	public int requestAdvancement(AdvanceVO advanceVO) {
		return sqlsession.insert("memberMapper.requestAdvancement",advanceVO);
	}
	//승급 신청이력 확인
	@Override
	public int checkRequest(String memberId) {
		return sqlsession.selectOne("memberMapper.checkRequest",memberId);
	}
	//회원 이미지 정보 확인
	@Override
	public MemImgVO countByMemberId(String memberId) {
		return sqlsession.selectOne("memberMapper.countByMemberId",memberId);
	}
	//기존 이미지 삭제
	@Override
	public void deleteMemImg(String memberId) {
		sqlsession.delete("memberMapper.deleteMemImg",memberId);
	}
	//이미지 등록
	@Override
	public void regMemImg(MemImgVO memImgVO) {
		sqlsession.insert("memberMapper.regMemImg",memImgVO);
	}
	//회원의 이미지 가져가기
	@Override
	public String getMemImg(String memberId) {
		return sqlsession.selectOne("memberMapper.getMemImg",memberId);
	}

}
