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
    this.name = "";
    this.desc = "";
    this.image = "";
    this.category = "";
};

TestQuestion = function () {
    this.text = "";
    this.image = "";
    this.variants = [];
}

AnswerVariant = function () {
    this.text = "";
    this.image = "";
    this.value = 0;
}

TestResult = function () {
    this.text = "";
    this.image = "";
    this.from = 0;
    this.to = 0;
}
