package com.tennis.world.admin.service;

import java.util.List;

import com.tennis.world.admin.vo.BlackListVO;
import com.tennis.world.admin.vo.MatchResultVO;
import com.tennis.world.match.vo.MatchVO;
import com.tennis.world.member.vo.AdvanceVO;
import com.tennis.world.member.vo.MemberVO;

public interface AdminService {
	//종료된 매치 리스트 조회
	List<String> getFinishMatchList();
	//종료된 매치 상세정보
	List<MatchVO> getDateByMatchResult(MatchVO matchVO);
	//매칭 결과 등록
	void regMatchResult(MatchResultVO matchResultVO);
	//승급신청 리스트 조회
	List<AdvanceVO> getAdvanList();
	//승급 데이터 조회
	AdvanceVO getAdvanDetail(String reqCode);
	//승급처리
	int setMemTier(AdvanceVO advanceVO);
	//블랙 리스트 조회
	List<MemberVO> getBlackList(MemberVO memberVO);
	//블랙 리스트 등록
	int regBlackList(BlackListVO blackListVO);
	//회원의 블랙포인트 확인
	int getMemberBlackCnt(String memberId);
	//회원 제명
	void expulsionByMember(String memberId);
	//회원의 경고 누적 사유
	List<BlackListVO> getMemberByBlackReason(String memberId);
	//회원의 누적 사유 삭제
	int deleteBlackCode(BlackListVO blackListVO);
	//제명 복구
	int setMemStateByBlack(String memberId);
	
}
