package com.tennis.world.club.vo;

import com.tennis.world.match.vo.TierVO;
import com.tennis.world.member.vo.MemberVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClubVO {
	private String clubCode;
	private String clubName;
	private String clubIntro;
	private String clubTier;
	private int clubPersonnel;
	private String clubLeader;
	private int clubHeadCount;
	private MemberVO memberVO;
	private TierVO tierVO;
}
