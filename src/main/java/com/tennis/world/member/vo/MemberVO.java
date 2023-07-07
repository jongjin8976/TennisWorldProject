package com.tennis.world.member.vo;

import java.util.List;


import com.tennis.world.match.vo.TierVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
	private String memberId;
	private String memberPw;
	private String memberName;
	private String memberBirth;
	private String memberTell;
	private String isAdmin;
	private String clubCode;
	private String regDate;
	private String tierCode;
	private String memState;
	private int blackCnt;
	private int memPoint;
	private int memberCode;
	private List<String> memIdList;
	private TierVO tierVO;
	private List<String> tierList; 
	private String searchKeyWord;
	private String searchValue;
}  
