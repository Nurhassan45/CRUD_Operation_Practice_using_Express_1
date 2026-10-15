export const ResMsg=(
    res:any,
    statusCode:number,
    successFlag:boolean,
    message:string,
    data?:any
)=>{
return res.status(statusCode).json({
    success:successFlag,
    message:message,
    data:data
})
}