package com.tennis.world.club.service;

import java.util.List;

import com.tennis.world.club.vo.ClubVO;
import com.tennis.world.member.vo.MemberVO;

public interface ClubService {
	//다음에 들어갈 클럽코드
	String getNextClubCode();
	//클럽명 중복조회
	int checkByClubName(String clubName);
	//클럽 생성 가능여부 확인
	int checkCountClubCode(String memberId);
	//클럽등록
	int createClub(ClubVO clubVO);
	//클럽리스트 조회
	List<ClubVO> getClubList(String clubCode);
	//클럽회원조회
	List<MemberVO> getClubMemberList(String clubCode);
	//클럽 가입 중복회원 조회
	int joinByDuplication(MemberVO memberVO);
	//클럽 가입
	int joinClub(MemberVO memberVO);
	//클럽 회원 삭제
	int dropOutClubByMember(MemberVO memberVO);
}
