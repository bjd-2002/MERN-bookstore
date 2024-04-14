const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => res.status(err.code || 500).json({
            success: true,
            message: err.message
        }));
    }
}


export {asyncHandler}