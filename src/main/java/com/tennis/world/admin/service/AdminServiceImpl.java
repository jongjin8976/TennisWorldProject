package com.tennis.world.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tennis.world.admin.vo.BlackListVO;
import com.tennis.world.admin.vo.MatchResultVO;
import com.tennis.world.match.vo.MatchVO;
import com.tennis.world.member.vo.AdvanceVO;
import com.tennis.world.member.vo.MemberVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public List<String> getFinishMatchList() {
		return sqlsession.selectList("adminMapper.getFinishMatchList");
	}

	@Override
	public List<MatchVO> getDateByMatchResult(MatchVO matchVO) {
		return sqlsession.selectList("adminMapper.getDateByMatchResult", matchVO);
	}
	
	//매칭 결과 등록 및 회원, 매칭 닫고 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regMatchResult(MatchResultVO matchResultVO) {
		sqlsession.insert("adminMapper.regMatchResult", matchResultVO);
		sqlsession.update("adminMapper.setMatchConfirmed",matchResultVO.getMatchCode());
		sqlsession.update("adminMapper.setWinnerScore", matchResultVO);
		sqlsession.update("adminMapper.setLoserScore", matchResultVO);
		
	}
	
	//승급 요청 리스트 조회
	@Override
	public List<AdvanceVO> getAdvanList() {
		return sqlsession.selectList("adminMapper.getAdvanList");
	}
	
	//승급 요청 데이터 조회
	@Override
	public AdvanceVO getAdvanDetail(String reqCode) {
		return sqlsession.selectOne("adminMapper.getAdvanDetail", reqCode);
	}
	
	//승급처리
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int setMemTier(AdvanceVO advanceVO) {
		sqlsession.update("adminMapper.setMemTier",advanceVO);
		return sqlsession.update("adminMapper.setConrimedAdvan",advanceVO.getReqCode());
	}
	
	//블랙리스트 조회
	@Override
	public List<MemberVO> getBlackList(MemberVO memberVO) {
		return sqlsession.selectList("adminMapper.getBlackList",memberVO);
	}
	
	//블랙리스트 등록
	//회원데이터 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int regBlackList(BlackListVO blackListVO) {
		sqlsession.insert("adminMapper.regBlackList",blackListVO);
		return sqlsession.update("adminMapper.setMemberByBlackCnt",blackListVO.getMemberId());
	}
	
	//회원 블랙포인트 확인
	@Override
	public int getMemberBlackCnt(String memberId) {
		return sqlsession.selectOne("adminMapper.getMemberBlackCnt",memberId);
	}
	
	//회원 제명
	@Override
	public void expulsionByMember(String memberId) {
		sqlsession.update("adminMapper.expulsionByMember",memberId);
		
	}
	//회원의 경고 누적사유 확인
	@Override
	public List<BlackListVO> getMemberByBlackReason(String memberId) {
		return sqlsession.selectList("adminMapper.getMemberByBlackReason",memberId);
	}
	
	//누적 사유 삭제
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int deleteBlackCode(BlackListVO blackListVO) {
		sqlsession.delete("adminMapper.deleteBlackCode",blackListVO.getBlackCode());
		return sqlsession.update("adminMapper.subtractBlackCnt", blackListVO.getMemberId());
	}
	
	//제명 복구
	@Override
	public int setMemStateByBlack(String memberId) {
		return sqlsession.update("adminMapper.setMemStateByBlack",memberId);
	}
}
