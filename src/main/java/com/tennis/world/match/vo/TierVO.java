package com.tennis.world.match.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TierVO {
	private String tierCode;
	private String tierName;
	private List<String> tierList;
}
