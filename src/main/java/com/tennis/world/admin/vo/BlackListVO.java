package com.tennis.world.admin.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BlackListVO {
	private String blackCode;
	private String memberId;
	private String blackComment;
	private String blackDate;
}  
