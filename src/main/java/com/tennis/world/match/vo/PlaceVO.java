package com.tennis.world.match.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PlaceVO {
	private String placeNo;
	private String placeName;
	private String placeType;
	private int courtCnt;
}
