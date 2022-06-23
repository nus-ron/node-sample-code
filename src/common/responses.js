export const respondSuccess = (res, code, data) => {
  let result = {
    success: true,
    data
  }

  res.status(code).json(result)
}