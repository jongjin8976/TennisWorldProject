//승급 승인
function setRequest(req_code) {
	swal.fire({
		title: "승급 처리",
		text: "승인하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/admin/setRequestAjax', //요청경로
				type: 'post',
				async: false,
				//contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'reqCode': req_code }, //필요한 데이터
				success: function(result) {
					if (result == 1) {
						swal.fire({
							title: "승인이 완료되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r)=>{
							location.href = "/admin/advancementRequestForm";
						});

					}
					else{
						swal.fire({
							title: "오류가 발생했습니다.",
							icon: 'error',
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
		else if (r.isDismissed) {
			swal.fire({
				title: "승인이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	})

}