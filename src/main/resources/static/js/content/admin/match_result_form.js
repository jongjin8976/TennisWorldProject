init();

function init() {
	//날짜 구하기
	const today = new Date();
	document.querySelector('#toDate').valueAsDate = today;

	const month_ago = new Date(today);
	month_ago.setMonth(today.getMonth() - 1);
	document.querySelector('#monthDate').valueAsDate = month_ago;
}


//날짜별 검색
function getMonthByResult() {
	const from_date = document.querySelector('#monthDate').value;
	const to_date = document.querySelector('#toDate').value;
	const result_tbody = document.querySelector('#resultTbody');
	let str = '';
	result_tbody.replaceChildren();
	//ajax start
	$.ajax({
		url: '/admin/getMonthByResultAjax', //요청경로
		type: 'post',
		async: false,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'fromDate': from_date, 'toDate': to_date }, //필요한 데이터
		success: function(result) {
			console.log(result);
			result.forEach(function(match_data) {
				str += '<tr>';
				str += `<td>${match_data.matchCode}</td>`;
				str += `<td>${match_data.typeVO.typeName}</td>`;
				str += `<td>${match_data.memberVO.memberName}</td>`;
				str += `<td>${match_data.tierVO.tierName}</td>`;
				str += `<td>${match_data.regDate}</td>`;
				str += `<td>`;
				str += `<div class="d-grid">`;
				str += `<input type="button" value="확인" onclick="regResultMatch('${match_data.matchCode}');" class="btn btn-primary">`;
				str += `</div>`;
				str += `</td>`;
				str += '</tr>';
			});

			result_tbody.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}
//모달창 띄우기
function regResultMatch(match_code) {
	const result_modal = new bootstrap.Modal('#matResultModal');
	//ajax start
	$.ajax({
		url: '/match/matchDetailAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'matchCode': match_code }, //필요한 데이터
		success: function(result) {
			console.log(result); //matchData. nameList, tierNameList
			document.querySelector('#matchCode').value = result['matchData'].matchCode;
			document.querySelector('#matchWriter').value = result['nameList'][0];
			document.querySelector('#matchPlace').value = result['matchData'].placeVO.placeName + '/' + result['matchData'].courtVO.courtName;
			const win_p1_select = document.querySelector('#winP1');
			const win_p2_select = document.querySelector('#winP2');
			const lose_p1_select = document.querySelector('#loseP1');
			const lose_p2_select = document.querySelector('#loseP2');

			let player_data = [];
			player_data.push(result['matchData'].player1);
			player_data.push(result['matchData'].player2);
			player_data.push(result['matchData'].player3);
			player_data.push(result['matchData'].player4);

			win_p1_select.replaceChildren();
			win_p2_select.replaceChildren();
			lose_p1_select.replaceChildren();
			lose_p2_select.replaceChildren();


			let str = '';

			for (let i = 0; i < result['nameList'].length; i++) {
				str += `<option value="${player_data[i]}">${result['nameList'][i]}</option>`;
			}

			win_p1_select.insertAdjacentHTML('afterbegin', str);
			lose_p1_select.insertAdjacentHTML('afterbegin', str);
			if (result['matchData'].matchType == 'TYPE_002') {
				win_p2_select.insertAdjacentHTML('afterbegin', str);
				lose_p2_select.insertAdjacentHTML('afterbegin', str);
			}



		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	result_modal.show();
}

//승리 팀원 변경
function changeWinner1(member_id) {
	const loser_selector = document.querySelector('#loseP1');
	const winner_selector = document.querySelector('#winP2');
	for (let i = 0; i < loser_selector.length; i++) {
		if (member_id.value != loser_selector[i].value) {
			loser_selector[i].selected = true;
		}
		if (winner_selector.length != 0) {
			if (member_id.value != winner_selector[i].value) {
				winner_selector[i].selected = true;
			}
			if (winner_selector[i].value != loser_selector[i].value) {
				loser_selector[i].selected = true;
			}
		}

	}
}
//패배 팀원 변경
function changeLoser1(member_id) {
	const winner_selector = document.querySelector('#winP1');
	for (let i = 0; i < winner_selector.length; i++) {
		if (member_id.value != winner_selector[i].value) {
			winner_selector[i].selected = true;
		}
	}
}




//경기 결과 등록
function regMatchResult() {
	const score_tbody = document.querySelector('#scoreTbody');
	const score_tr = score_tbody.querySelectorAll('tr');
	const team1_td = score_tr[0].querySelectorAll('input[type=number]');
	const team2_td = score_tr[1].querySelectorAll('input[type=number]');
	const result_form = document.querySelector('#resultForm');

	const win_p1 = document.querySelector('#winP1').value;
	const win_p2 = document.querySelector('#winP2').value;
	const loser_p1 = document.querySelector('#loseP1').value;
	const loser_p2 = document.querySelector('#loseP2').value;
	

	if (win_p1 == loser_p1) {
		swal.fire({
			html: "같은 인원으로 등록 할 수 없습니다..",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (win_p1 == win_p2) {
		swal.fire({
			html: "같은 인원으로 등록 할 수 없습니다..",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (win_p1 == loser_p2) {
		swal.fire({
			html: "같은 인원으로 등록 할 수 없습니다..",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (win_p2 == loser_p1) {
		swal.fire({
			html: "같은 인원으로 등록 할 수 없습니다..",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (loser_p1 == loser_p2) {
		swal.fire({
			html: "같은 인원으로 등록 할 수 없습니다..",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		for (let i = 0; i < team1_td.length - 2; i++) {
			if (team1_td[i].value == 0) {
				swal.fire({
					html: "1~3세트 승리 플레이어 점수는 <br> 빈값을 입력 할 수 없습니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
			else if (team1_td[i].value > 7) {
				swal.fire({
					html: "세트 스코어는 7점 이상 불가합니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
			else if (Math.sign(team1_td[i].value) == -1) {
				swal.fire({
					html: "음수는 입력 할 수 없습니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
		}

		for (let i = 0; i < team2_td.length - 2; i++) {
			if (team2_td[i].value >= 7) {
				swal.fire({
					html: "세트 스코어는 7점 이상 불가합니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
			else if (Math.sign(team2_td[i].value) == -1) {
				swal.fire({
					html: "음수는 입력 할 수 없습니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
		}
		result_form.submit();

	}

}
