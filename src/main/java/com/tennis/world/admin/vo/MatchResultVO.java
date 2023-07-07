package com.tennis.world.admin.vo;

import com.tennis.world.match.vo.MatchVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MatchResultVO {
	private String resultCode;
	private String matchCode;
	private String winnerOne;
	private String winnerTwo;
	private String loserOne;
	private String loserTwo;
	private int winnerScore;
	private int loserScore;
	private int firstSetScoreP1;
	private int firstSetScoreP2;
	private int secondSetScoreP1;
	private int secondSetScoreP2;
	private int thirdSetScoreP1;
	private int thirdSetScoreP2;
	private int fourthSetScoreP1;
	private int fourthSetScoreP2;
	private int fifthSetScoreP1;
	private int fifthSetScoreP2;
	private MatchVO matchVO;
}
