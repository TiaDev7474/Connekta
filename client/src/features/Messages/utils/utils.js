

const getNameInitial= (name) => {
      let initials;
      const nameSplit = name.split(' ');
      console.log(nameSplit)
      const nameLength = nameSplit.length;
      if(nameLength > 1 ){
          initials = nameSplit[0].substring(0,1) + nameSplit[nameLength - 1].substring(0,1)
         
      }
      if(nameLength === 1){
        initials = nameSplit[0].substring(0 ,1)
        
      }
      return initials.toUpperCase();
}

const getRandomColor = () => {
     const letters = '0123456789ABCDEF'
     var color = '#'

     for (let i = 0 ; i <  6 ; i++) {
         color +=letters[Math.floor(Math.random()* 16)]

     }
     return color
}



const  createPdpFromInitials = (name , size , color) => {
    if (name === null ) return ;

    name = getNameInitial(name)
    color = getRandomColor()
    const canvas = document.createElement('canvas')

    const context = canvas.getContext('2d');
    canvas.width = canvas.height = size;

    context.fillStyle ="#fffff"
    context.fillRect(0,0,size,size)

    context.fillStyle =`${color}50`
    context.fillRect(0,0,size,size)

    context.fillStyle = color;
    context.textBaseline ='middle'

    context.textAlign = 'center'
    context.font = `${size/2}px Roboto`
    context.fillText(name,(size/2),(size/2))

    return canvas.toDataURL()





}








export const MessageUtils = {
     createPdpFromInitials ,
     getNameInitial,
     getRandomColor
}