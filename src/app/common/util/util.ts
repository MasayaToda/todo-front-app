export class Utils{
  getLocalTime(timeStr?:string){
    if(typeof timeStr === 'string'){
      return new Date(timeStr).toLocaleDateString() +' '+ new Date(timeStr).toLocaleTimeString()
    }else{
      return ''
    }
  }
}