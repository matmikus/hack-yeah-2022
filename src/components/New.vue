<template>
    <div class="new-container">
        <div class="new-header">
            <label for="name">Nazwa quizu</label>
            <input name="name" type="text" v-model="quizTitle">
        </div>
        <div class="new-columns">
            <div class="new-search">
                <div class="search-header">Wyszukiwanie materiałów IPN</div>
                <input type="text" v-model="searchPhrase" />
                <div class="loader" v-if="loading" v-once />
                <div v-else>
                    <div v-for="(result, index) in searchResults" :key="index" class="result-item">
                        <a :href="result.link" target="_blank">
                            {{ result.link }}
                        </a>
                        <div class="result-button" @click="addSource(result)">➡️</div>
                    </div>
                </div>
                <div v-if="searchPhrase !== '' && !loading && searchResults.length === 0">
                    Brak wyników
                </div>
            </div>
            <div class="new-content">
                Wygląd quizu
                <div class="quiz-preview">
                    <div class="quiz-title">
                        {{ quizTitle }}
                    </div>
                    <div v-for="(element, index) in quizContent" :key="index" class="quiz-element">
                        <div v-if="element.type === 'source'" class="quiz-source">
                            <div>Zapoznaj się z materiałem pod adresem:</div>
                            <a :href="element.url" target="_blank">{{ element.url }}</a>
                        </div>
                        <div v-if="element.type === 'query'" class="quiz-query">
                            <input type="text" v-model="element.text" />
                            <input type="text" class="input--answer" placeholder="Odpowiedź:" />
                        </div>
                    </div>
                    <button class="query-button" @click="addQuery">
                        ➕ DODAJ PYTANIE
                    </button>
                </div>
                <div class="save-button-container">
                    <button class="save-butotn" @click="saveQuiz">
                        ZAPISZ QUIZ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data () {
            return {
                searchResults: [],
                searchPhrase: '',
                loading: false,
                quizTitle: '',
                quizContent: []
            };
        },
        methods: {
            search (phrase) {
                if (phrase === '') {
                    this.loading = false;
                    this.searchResults = [];
                    return;
                }

                setTimeout(() => {
                    if (phrase !== this.searchPhrase) {
                        return;
                    }

                    axios.get(`/api?q=${phrase}`).then((res) => {
                        if (phrase === this.searchPhrase) {
                            this.searchResults = res.data;
                            this.loading = false;
                        }
                    });
                }, 600);
            },
            addSource (source) {
                this.quizContent.push({
                                          type: 'source',
                                          url: source.link
                                      });
            },
            addQuery () {
                this.quizContent.push({
                                          type: 'query',
                                          text: ''
                                      })
            },
            saveQuiz () {
                this.$store.commit('addToList', {
                    title: this.quizTitle,
                    content: this.quizContent,
                    created: new Date()
                });

                this.$store.commit('setNav', 'lista');
            }
        },
        watch: {
            searchPhrase (phrase) {
                this.loading = true;
                this.search(phrase);
            }
        }
    };
</script>

<style>
    .new-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .new-header {
        margin-bottom: 32px;
    }

    .new-header > input {
        width: 340px;
    }

    .new-columns {
        display: flex;
        width: 100%;
    }

    .new-search {
        border-right: 1px solid black;
        height: 100%;
        padding: 24px 24px 24px 0;
        width: 50%;
        text-align: right;
    }

    .new-search > input {
        margin: 8px 0 16px;
        width: 205px;
    }

    .new-content {
        padding: 24px 0 0 24px;
        width: 50%;
        border-left: 1px solid black;
        margin-left: -1px;
    }

    .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid black;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 16px;
        margin-left: calc(100% - 95px);
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .result-item {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
    }

    .result-item > a {
        word-break: break-all;
    }

    .result-button {
        font-size: 30px;
        cursor: pointer;
        margin-left: 8px;
    }

    .search-header {
        white-space: nowrap;
    }

    .quiz-preview {
        background-color: aliceblue;
        width: 100%;
        min-height: 300px;
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .quiz-title {
        padding: 32px 0 0;
        font-size: 20px;
        text-align: center;
    }

    .quiz-element {
        width: 100%;
    }

    .query-button {
        margin: 32px auto;
        cursor: pointer;
    }

    .quiz-source {
        padding: 32px;
    }

    .quiz-query {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .quiz-element input {
        width: calc(100% - 70px);
        margin: 0 auto;
    }

    .input--answer {
        margin: 16px auto 32px !important;
        pointer-events: none;
    }

    .save-button-container {
        display: flex;
        justify-content: center;
        padding: 32px;
        cursor: pointer;
    }
</style>
