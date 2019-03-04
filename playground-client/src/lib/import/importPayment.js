export const importPayment = ({ amount, method }) => {
  return new Promise(
    (resolve, reject) => {
      window.IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: method,
        merchant_uid : 'somthing' + new Date(),
        name : '주문명:결제테스트',
        amount : amount,
      }, function(rsp) {
        if(rsp.success) {
          resolve(alert('결제가 완료되었습니다'));
          window.location.href = '/';
        } else {
          let msg = '결제에 실패하였습니다\n';
          msg += '에러 내용: ' + rsp.error_msg;
          reject(alert(msg));
          window.location.href = '/voucher';
        }
      });
    }
  );
};