init();

function init() {
	const today = new Date();
	document.querySelector('#nowDate').valueAsDate = today;
}


function setEndTime() {
	const start_time_input = document.getElementById("startTime");
	const start_time = start_time_input.value; // 입력된 시작 시간 값 가져오기
	const end_time_set = document.querySelector('#endTime');
	let end_hour_time = '';
	// 시간 값에서 분 값을 제거
	const hour = parseInt(start_time.split(":")[0]);
	let end_time = hour + ":00"; // 분 값을 00으로 설정
	if (end_time.length == 4) {
		end_time = end_time.padStart(5, '0');
	}

	console.log(end_time);

	if (end_time == '23:00') {
		end_hour_time = '00:00';
	}
	else if (end_time == '00:00') {
		end_hour_time = '01:00';
	}
	else {
		end_hour_time = (hour + 1) + ":" + "00";
	}

	if (end_hour_time.length == 4) {
		end_hour_time = end_hour_time.padStart(5, '0');
	}


	// 제한된 값으로 입력 필드에 설정
	start_time_input.value = end_time;
	end_time_set.value = end_hour_time;

}



function regMatch() {
	const start_time = document.querySelector('#startTime');
	console.log(start_time.value);

}
//코트리스트 가져오기
function getCourtCode(place_no) {
	const court_select = document.querySelector('#courtSelect');
	//ajax start
	$.ajax({
		url: '/match/getCourtAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'placeNo': place_no.value }, //필요한 데이터
		success: function(result) {
			court_select.replaceChildren();
			let str = '';
			result.forEach(function(c) {
				str += `<option value="${c.courtNo}">${c.courtName}</option>`;
			})
			court_select.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}


function checkTier(mem_tier) {
	let selected_tier = document.querySelector('#memTier');
	const select_len = selected_tier.options.length;
	console.log(select_len);

	const comp_val = parseInt(selected_tier.value.substring(7));
	const mem_tier_val = parseInt(mem_tier.substring(7));
	if (comp_val < mem_tier_val) {
		swal.fire({
			title: "경고",
			text: "매칭 신청자의 티어보다 낮은 티어는 \n 신청이 불가합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (comp_val > mem_tier_val + 2) {
		swal.fire({
			title: "경고",
			text: "매칭 신청자의 티어보다 3 티어 이상 높습니다 상관 없으신가요?  일방적인 경기가 이루어 질 수도 있습니다",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소"
		}).then((r) => {
			if (r.isConfirmed) {
				swal.fire({
					title: "확인",
					text: "경기에 좋은 결과가 있기를 기원합니다~",
					icon: 'success',
					button: '확인',
				})
			}
			else if (r.isDismissed) {
				swal.fire({
					title: "확인",
					text: "다음 기회에 도전해 보세요~",
					icon: 'success',
					button: '확인',
				}).then((r) => {
					for (let i = 0; i < select_len; i++) {
						if (selected_tier.options[i].value == mem_tier) {
							selected_tier.options[i].selected = true;
						}
					}

				})
			}
		})
	}
}
//매칭 등록
function regMatch() {
	//form
	const match_form = document.querySelector('#matchForm');
	
	//날짜 포멧
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	const formatted_date = `${year}-${month}-${day}`;

	const match_date = document.querySelector('#nowDate').value;

	const other_date = new Date(match_date);


	//필요한 데이터
	const start_time = document.querySelector('#startTime').value;
	const end_time = document.querySelector('#endTime').value;
	const split_start_time = parseInt(start_time.split(":")[0]);
	const place_select = document.querySelector('#placeSelect').value;
	const court_select = document.querySelector('#courtSelect').value;


	//조건식
	if (split_start_time < 7) {
		swal.fire({
			title: "경고",
			text: "매칭 시작 가능시간은 07시 부터 입니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (split_start_time > 21) {
		swal.fire({
			title: "경고",
			text: "매칭 시작 마감시간은 21시 까지 입니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else if (start_time == '') {
		swal.fire({
			title: "경고",
			text: "시작, 종료 시간을 입력 해 주세요",
			icon: 'error',
			button: '확인',
		})
		return
	}

	else if (other_date <= new Date(formatted_date)) {
		swal.fire({
			title: "경고",
			text: "매칭 일자는 금일 다음날 부터 가능합니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else {
		//ajax start
		$.ajax({
			url: '/match/checkCourtAjax', //요청경로
			type: 'post',
			async: true,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {
				'matchDate': match_date, 'startTime': start_time,
				'endTime': end_time, 'placeNo': place_select,
				'courtNo': court_select
			}, //필요한 데이터
			success: function(result) {
				if (result == 0) {
					swal.fire({
						title: "매칭 등록 성공",
						text: "매칭 등록이 완료 되었습니다.",
						icon: 'success',
						button: '확인',
					}).then((r)=>{
						match_form.submit();						
					})
				}
				else{
					swal.fire({
						title: "경고",
						text: "해당 날짜와 시간에 등록된 경기가 있습니다.",
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

}





































