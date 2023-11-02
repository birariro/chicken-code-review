const { getReview } = require("../src/review/review");

const openai_key = "sk-xxx"
const review_code = "for(int i = 0 ; i < 10; i++) i++;"

test('', () => {
    expect(getReview(openai_key, review_code))
});



