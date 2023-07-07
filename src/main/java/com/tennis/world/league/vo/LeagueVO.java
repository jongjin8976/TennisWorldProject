package com.tennis.world.league.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LeagueVO {
	private String leagueCode;
	private String leagueName;
	private int leagueFirstReword;
	private int leagueSecondReword;
	private int leagueThirdReword;
	private String leagueDate;
	private String firstPlace;
	private String secondPlace;
	private String thirdPlace;
	private String leagueLocation;
}
