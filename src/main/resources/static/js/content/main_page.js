//매칭 확인
function participateMatch(match_code, dead_line, role) {
	const match_modal = new bootstrap.Modal('#matchModal');
	const match_tbody = document.querySelector('#matchTbody');


	if (role == 'anonymousUser') {
		swal.fire({
			title: "경고",
			text: "로그인이 필요합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else {
		const match_code_input = document.querySelector('#matchCode');
		const match_reader_input = document.querySelector('#matchReader');
		const match_rule_input = document.querySelector('#matchRule');
		const start_time_input = document.querySelector('#startTime');
		const end_time_input = document.querySelector('#endTime');
		const place_name_input = document.querySelector('#placeName');
		const court_name_input = document.querySelector('#courtName');
		const match_intro_area = document.querySelector('#matchIntro');
		const match_type_code = document.querySelector('#matchTypeCode');
		const del_div = document.querySelector('#delDiv');
		//ajax start
		$.ajax({
			url: '/match/matchDetailAjax', //요청경로
			type: 'post',
			async: false,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'matchCode': match_code }, //필요한 데이터
			success: function(result) {
				console.log(result);
				match_tbody.replaceChildren();
				del_div.replaceChildren();
				match_code_input.value = match_code;
				match_reader_input.value = result['nameList'][0];
				match_rule_input.value = result['matchData'].typeVO.typeName;
				start_time_input.value = result['matchData'].startTime;
				end_time_input.value = result['matchData'].endTime;
				place_name_input.value = result['matchData'].placeVO.placeName;
				court_name_input.value = result['matchData'].courtVO.courtName;
				match_intro_area.value = result['matchData'].matchIntro;
				match_type_code.value = result['matchData'].matchType;
				let str = '';
				let str1 = '';
				str += '<tr>';
				str += `<input type="hidden" id="player1" value="${result['matchData'].player1}">`;
				str += `<input type="hidden" id="player2" value="${result['matchData'].player2}">`;
				str += `<input type="hidden" id="player3" value="${result['matchData'].player3}">`;
				str += `<input type="hidden" id="player4" value="${result['matchData'].player4}">`;
				str += `<input type="hidden" id="gameRule" value="${result['matchData'].matchType}">`;
				str += `<input type="hidden" id="tierCode" value="${result['matchData'].matchTier}">`;
				str += `<input type="hidden" id="isDeadline" value="${result['matchData'].isDeadLine}">`;
				for (let i = 0; i < result['nameList'].length; i++) {
					str += `<td>${result['nameList'][i]}</td>`;
					str += `<td>${result['tierNameList'][i]}</td>`;
				}
				str += '</tr>';
				if (role == result['matchData'].player1) {
					str1 += `<input type="button" value="매칭취소" onclick="delMatch('${match_code}');" class="btn btn-primary">`;
				}
				del_div.insertAdjacentHTML('afterbegin', str1);
				match_tbody.insertAdjacentHTML('afterbegin', str);
				match_modal.show();
			},
			error: function() {
				alert('실패');

			}
		});
		//ajax end


	}

}

//경기 참가
function joinMatch(member_id) {
	const match_code_input = document.querySelector('#matchCode').value;
	const player1 = document.querySelector('#player1').value;
	const player2 = document.querySelector('#player2').value;
	const player3 = document.querySelector('#player3').value;
	const player4 = document.querySelector('#player4').value;
	const match_rule = document.querySelector('#gameRule').value;
	const is_deadline = document.querySelector('#isDeadline').value;

	console.log(player2);
	console.log(match_rule);


	if (member_id == player1) {
		swal.fire({
			title: "경고",
			text: "주최자는 참가가 불가능합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (is_deadline == 'Y') {
		swal.fire({
			title: "경고",
			text: "마감된 경기 입니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (member_id == player2) {
		swal.fire({
			title: "경고",
			text: "중복 참가는 불가능 합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (member_id == player3) {
		swal.fire({
			title: "경고",
			text: "중복 참가는 불가능 합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (member_id == player4) {
		swal.fire({
			title: "경고",
			text: "중복 참가는 불가능 합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}


	if (match_rule == 'TYPE_001') {
		//단식 검증
		//ajax start
		$.ajax({
			url: '/match/valifyPlayerAjax', //요청경로
			type: 'post',
			async: false,
			contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'matchCode': match_code_input }, //필요한 데이터
			success: function(result) {
				if (result == 0) {
					//매칭 티어 검증
					//ajax start
					$.ajax({
						url: '/match/valifyJoinAjax', //요청경로
						type: 'post',
						async: false,
						//contentType: 'application/json; charset=UTF-8',
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						data: { 'matchCode': match_code_input }, //필요한 데이터
						success: function(result) {
							console.log(result);
							if (result == false) {
								swal.fire({
									title: "경고",
									text: "티어가 높아 참가가 불가능 합니다",
									icon: 'error',
									button: '확인',
								})
								return
							}
							else {
								swal.fire({
									title: "단식 경기를 신청하시겠습니까?",
									icon: "question",
									showCancelButton: true,
									confirmButtonText: "확인",
									cancelButtonText: "취소"
								}).then((r) => {
									if (r.isConfirmed) {
										//단식인 경우
										if (match_rule == 'TYPE_001') {
											//ajax start
											$.ajax({
												url: '/match/regMatchMemberAjax', //요청경로
												type: 'post',
												async: false,
												//contentType : 'application/json; charset=UTF-8',
												contentType: "application/x-www-form-urlencoded; charset=UTF-8",
												data: { 'matchCode': match_code_input }, //필요한 데이터
												success: function(result) {
													if (result == 1) {
														swal.fire({
															title: "참가 완료되었습니다.",
															icon: 'success',
															button: '확인',
														}).then((r) => {
															location.href = '/';
														});
													}
												},
												error: function() {
													alert('실패');
												}
											});
											//ajax end		
										}
									}
									else if (r.isDismissed) {
										swal.fire({
											title: "신청이 취소되었습니다.",
											icon: 'success',
											button: '확인',
										})
									}
								})
							}
						},
						error: function() {
							alert('실패');
						}
					});
					//ajax end
				}
				else {
					swal.fire({
						title: "신청이 마감되었습니다.",
						icon: 'error',
						button: '확인',
					})
					return
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
	//복식 선수 검증
	else if (match_rule == 'TYPE_002') {
		//ajax start
		$.ajax({
			url: '/match/valifyJoinAjax', //요청경로
			type: 'post',
			async: false,
			contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'matchCode': match_code_input }, //필요한 데이터
			success: function(result) {
				if (result == false) {
					swal.fire({
						title: "경고",
						text: "티어가 높아 참가가 불가능 합니다",
						icon: 'error',
						button: '확인',
					})
					return
				}
				else {
					swal.fire({
						title: "복식 경기를 신청하시겠습니까?",
						icon: "question",
						showCancelButton: true,
						confirmButtonText: "확인",
						cancelButtonText: "취소"
					}).then((r) => {
						if (r.isConfirmed) {
							//ajax start
							$.ajax({
								url: '/match/valifyPlayerByDoublesAjax', //요청경로
								type: 'post',
								async: false,
								//contentType : 'application/json; charset=UTF-8',
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								data: { 'matchCode': match_code_input }, //필요한 데이터
								success: function(result) {
									//복식선수 등록
									if (result == 0) {
										//ajax start
										$.ajax({
											url: '/match/regMatchMemberDoublesAjax', //요청경로
											type: 'post',
											async: false,
											contentType: 'application/json; charset=UTF-8',
											contentType: "application/x-www-form-urlencoded; charset=UTF-8",
											data: { 'matchCode': match_code_input }, //필요한 데이터
											success: function(result) {
												if (result == 2) {
													swal.fire({
														title: "2번 선수로 등록 되었습니다.",
														icon: 'success',
														button: '확인',
													}).then((r) => {
														location.href = '/';
													});
												}
												else if (result == 3) {
													swal.fire({
														title: "3번 선수로 등록 되었습니다.",
														icon: 'success',
														button: '확인',
													}).then((r) => {
														location.href = '/';
													});
												}
												else if (result == 4) {
													swal.fire({
														title: "4번 선수로 등록 되었습니다.",
														icon: 'success',
														button: '확인',
													}).then((r) => {
														location.href = '/';
													});
												}
											},
											error: function() {
												alert('실패');
											}
										});
										//ajax end

									}
									else {
										swal.fire({
											title: "신청이 마감되었습니다.",
											icon: 'error',
											button: '확인',
										})
										return
									}
								},
								error: function() {
									alert('실패');
								}
							});
							//ajax end

						}
						else if (r.isDismissed) {
							swal.fire({
								title: "승인이 취소되었습니다.",
								icon: 'success',
								button: '확인',
							});
							return
						}
					});
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end


	}


}

//매칭 취소
function delMatch(match_code) {
	swal.fire({
		title: "매칭 취소",
		text: "취소하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/match/deleteMatchAjax', //요청경로
				type: 'post',
				async: false,
				//contentType : 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'matchCode': match_code }, //필요한 데이터
				success: function(result) {
					if (result == 1) {
						swal.fire({
							title: "매칭이 취소되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							location.href = '/';
						});
					}
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end				
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	});

}


//참가 취소
function cancelMatch(member_id) {
	const match_code_input = document.querySelector('#matchCode').value;
	swal.fire({
		title: "참가 취소",
		text: "취소하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/match/validateCancelMatchAjax', //요청경로
				type: 'post',
				async: true,
				//contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'matchCode': match_code_input, 'memberId': member_id }, //필요한 데이터
				success: function(result) {
					if (result == 0) {
						swal.fire({
							title: "참가된 내역이 없습니다.",
							icon: 'error',
							button: '확인',
						});
						return
					}
					else {
						//ajax start
						$.ajax({
							url: '/match/cancelMatchAjax', //요청경로
							type: 'post',
							async: true,
							//contentType : 'application/json; charset=UTF-8',
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							data: { 'matchCode': match_code_input, 'memberId': member_id }, //필요한 데이터
							success: function(result) {
								if (result == 1) {
									swal.fire({
										title: "참가가 취소되었습니다.",
										icon: 'success',
										button: '확인',
									}).then((r) => {
										location.href = '/';
									});
								}
							},
							error: function() {
								alert('실패');
							}
						});
						//ajax end
					}
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end

		}
		else if (r.isDismissed) {
			swal.fire({
				title: "취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	});

}





















