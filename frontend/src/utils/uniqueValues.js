export const uniqueValues = (array) => {
    return array.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
}