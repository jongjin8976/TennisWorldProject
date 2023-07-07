package com.tennis.world.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdvanceVO {
	private String reqCode;
	private String memberId;
	private int memPoint;
	private String requestDate;
	private String beforTierCode;
	private String afterTierCode;
	private String isConfirmed;
	private MemberVO memberVO;
}
