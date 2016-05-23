Profile = function () {
    this.name = "";
    this.email = "";
};

Test = function () {
    this.info = null;
    this.questions = [];
    this.results = [];
};

TestInfo = function () {
    this.name = null;
    this.desc = null;
    this.image = null;
    this.category = null;
};

TestQuestion = function () {
    this.text = null;
    this.variants = [];
    this.scores = [];
}

AnswerVariant = function () {
    this.text = null;
    this.value = null;
}

TestResult = function () {
    this.text = null;
    this.image = null;
    this.rangeMin = null;
    this.rangeMax = null;
}
