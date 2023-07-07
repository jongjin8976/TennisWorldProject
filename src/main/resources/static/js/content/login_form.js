function login() {
	const mem_id = document.querySelector('#memId');
	const mem_pw = document.querySelector('#memPw');

	if (mem_id.value == '') {
		swal.fire({
			title: "오류",
			text: "아이디에 빈 값은 입력할 수 없습니다.",
			icon: "warning",
			button: '확인',
		});
		return
	}
	else if (mem_pw.value == '') {
		swal.fire({
			title: "오류",
			text: "비밀번호에 빈 값은 입력할 수 없습니다.",
			icon: "warning",
			button: '확인',
		});
		return
	}

	else {
		//ajax start
		$.ajax({
			url: '/member/login', //요청경로
			type: 'post',
			async: false,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'memberId': mem_id.value, 'memberPw': mem_pw.value }, //필요한 데이터
			success: function(result) {
				console.log(result);
				if (result == 'success') {
					swal.fire({
						title: "로그인 성공",
						text: "메인 페이지로 이동합니다.",
						icon: "success",
						button: '확인',
					}).then((r)=>{
						location.href="/";
					})
				}
				else{
					swal.fire({
						title: "로그인 오류",
						html: `${result}`,
						icon: "error",
						button: '확인',
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