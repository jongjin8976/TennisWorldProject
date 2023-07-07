package com.tennis.world.member.service;

import java.util.List;

import com.tennis.world.member.vo.AdvanceVO;
import com.tennis.world.member.vo.MemImgVO;
import com.tennis.world.member.vo.MemberVO;

public interface MemberService {
	int chkCntId(String memberId);
	
	void regMember(MemberVO memberVO);
	
	//로그인
	MemberVO login(String memId);
	
	//이름 가져오기
	String getMemName(String memberId);
	
	//회원 티어 가져오기
	String getMemTier(String memberId);
	
	//내정보 가져오기
	MemberVO getMyInfo(String memberId);
	
	//승리 데이터 가져오기
	int getWinningData (String memberId);
	
	//패배 데이터 가져오기
	int getLoseData (String memberId);
	
	//클럽 이름 조회
	String getClubNameForMember(String clubCode);
	
	//클럽 회원 리스트 조회
	List<MemberVO>getClubMemberList(String clubCode);
	
	//승급 신청이력 확인
	int checkRequest(String memberId);
	
	//승급 신청
	int requestAdvancement(AdvanceVO advanceVO);
	
	//회원 이미지 등록여부 확인
	MemImgVO countByMemberId(String memberId);
	
	//기존 이미지 삭제
	void deleteMemImg(String memberId);
	
	//이미지 등록
	void regMemImg(MemImgVO memImgVO);
	
	//회원의 이미지 가져가기
	String getMemImg(String memberId);
	
}
