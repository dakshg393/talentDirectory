export const printRoute = (req,res,next) =>{

    const route = req.path
    console.log(route)

    next()
}