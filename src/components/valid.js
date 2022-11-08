const arr = [{ name: "rose",hobbie:[{sport:"badminton"},{sport:"football"}] }, { name: "pae",hobbie:[{sport:"basketball"},{sport:"ball"}]  }]
let countOut =0
let countIn = 0
arr.forEach(item => {
let isValid = false

    console.log("name=>",item.name)
    item.hobbie.forEach((hob,index) => {
        console.log(item.name,hob.sport,index)
        countIn++
        if(hob.sport==="football"||hob.sport==="badminton") isValid = true
console.log("9=>",countIn)

    })
    countOut++
    if (isValid) {
        
        console.log('push');
    }
console.log("12=>",countOut)

})
console.log(countOut)
console.log(countIn)
