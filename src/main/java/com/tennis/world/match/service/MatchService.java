package com.tennis.world.match.service;

import java.util.List;

import com.tennis.world.admin.vo.MatchResultVO;
import com.tennis.world.match.vo.CourtVO;
import com.tennis.world.match.vo.MatchVO;
import com.tennis.world.match.vo.PlaceVO;
import com.tennis.world.match.vo.TierVO;
import com.tennis.world.match.vo.TypeVO;
import com.tennis.world.member.vo.MemberVO;

public interface MatchService {
	//티어코드 리스트
	List<TierVO> getTierList();
	
	//매치 타입 리스트
	List<TypeVO> getTypeList();
	
	//테니스장 리스트
	List<PlaceVO> getPlaceList();
	
	//코트 리스트
	List<CourtVO> getCourtList(String placeNo);
	
	//코트 예약 중복 체크
	int checkMatchByCondition(MatchVO matchVO);
	
	//매치 등록
	void regMatch(MatchVO matchVO);
	
	//매치 리스트 조회
	List<MatchVO> getMatchList();
	
	//매치 상세정보
	MatchVO getMatchInfo(String matchCode);
	
	//상세정보 이름값 가져오기
	List<String> getNameList(MemberVO memberVO);
	
	//상세정보 티어코드 가져오기
	List<String> getTierCodeList(MemberVO memberVO);
	
	//상세정보 티어 이름 가져오기
	List<String> getTierNameList(TierVO tierVO);
	
	//티어검증 두개
	String valifyTier(String memberId);
	String valifyMatch(String matchCode);
	
	//단식 검증
	int valifyPlayer(String matchCode);
	
	//복식 검증
	int valifyPlayerByDoubles(String matchCode);
	
	//3번 선수 검증
	int valifyPlayer3(String matchCode);
	
	//2번 선수 등록
	int regMatchMember2(MatchVO matchVO);
	
	//3번 선수 등록	
	int regMatchMember3(MatchVO matchVO);
	
	//4번 선수 등록	
	int regMatchMember4(MatchVO matchVO);
	
	//마감 실행
	void setDeadLine();
	
	//단식 매칭 결과 리스트
	List<MatchResultVO> getResultList();
	
	//복식 매칭 결과 리스트
	List<MatchResultVO> getResultByDoubleList();
	
	//매칭 취소
	int deleteMatch(String matchCode);
	
	//참가 취소 검증
	int valiCountPlayer(MatchVO matchVO);
	
	//참가 리스트
	MatchVO getMatchPlayerList(String matchCode);
	
	//참가 취소
	int cancelMatchByPlayer(MatchVO matchVO);
	
	//자신의 티어 조회
	String getMyTierCode(String memberId);
	
	//자신에게 맞는 조건 제외한 대상자 조회
	List<Integer> getMemberCodeList(MemberVO memberVO);
	
	//랜덤 회원 ID 가져오기
	String getMemberIdByRandom(int memberCode);
	
	//랜덤 매칭 검증
	int getCheckRandomMatch(MatchVO matchVO);
	
	//랜덤하게 선택된 회원 검증
	int valiPlayer2ByRandom(MatchVO matchVO);
	
	
}
