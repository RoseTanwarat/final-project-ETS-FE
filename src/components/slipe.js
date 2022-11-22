const arr = [{ ans: 'be', title: 'bee', choice: [{ input: '1', name: '1' }, { input: '2', name: '2' }, { input: '3', name: '3' }] },{ ans: 'be2', title: 'bee2', choice: [{ input: '1', name: '1' }, { input: '2', name: '2' }, { input: '3', name: '3' }] }]
arr[1].choice.splice(0, 1)
console.log(arr);