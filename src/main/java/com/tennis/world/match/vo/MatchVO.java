package com.tennis.world.match.vo;

import com.tennis.world.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MatchVO {
	private String matchCode;
	private String matchWriter;
	private String matchType;
	private String matchIntro;
	private String regDate;
	private String matchDate;
	private String startTime;
	private String endTime;
	private String matchTier;
	private String placeNo;
	private String courtNo;
	private String player1;
	private String player2;
	private String player3;
	private String player4;
	private String isDeadLine;
	private MemberVO memberVO;
	private TypeVO typeVO;
	private TierVO tierVO;
	private PlaceVO placeVO;
	private CourtVO courtVO;
	private String fromDate;
	private String toDate;
	private String isConfirmed;
	private String playerCode;
	
}
