<template>
    <div class="list-container">
        <div v-if="list.length">
            <table>
                <tr v-for="(quiz, index) in list.slice().reverse()">
                    <td>
                        {{ index + 1 }}.
                    </td>
                    <td>
                        {{ quiz.title }}
                    </td>
                    <td>
                        {{ $dayjs(quiz.created).format('DD-MM-YYYY') }}
                    </td>
                    <td>
                        <button @click="createPdf(index, quiz.title)">
                            .pdf
                        </button>
                    </td>
                    <td>
                        <button @click="createDocx(quiz)">
                            .docx
                        </button>
                    </td>
                    <td>
                        <a href="mailto:kancelaria@mein.gov.pl">
                            <button>
                                wyślij do MEiN
                            </button>
                        </a>
                    </td>
                    <td style="display: none;">
                        <div :id="index">
                            <div class="quiz-title">
                                {{ quiz.title }}
                            </div>
                            <div v-for="(element, index) in quiz.content" :key="index" class="quiz-element">
                                <div v-if="element.type === 'source'" class="quiz-source">
                                    <div>Zapoznaj się z materiałem pod adresem:</div>
                                    <a :href="element.url" target="_blank">{{ element.url }}</a>
                                </div>
                                <div v-if="element.type === 'query'" class="quiz-query">
                                    <div>{{ element.text }}</div>
                                    <input type="text" class="input--answer" placeholder="Odpowiedź:" />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            Brak quizów
        </div>
    </div>
</template>

<script>
    import {
        WidthType,
        BorderStyle,
        Document,
        Paragraph,
        Packer,
        TextRun,
        ExternalHyperlink
    } from "docx";
    import { saveAs } from "file-saver";

    export default {
        computed: {
            list () {
                return this.$store.state.list;
            }
        },
        methods: {
            createPdf (id, title) {
                if (!process.client) return;

                const quiz = document.getElementById(id);
                console.log(quiz);

                const html2pdf = require('html2pdf.js');

                html2pdf(quiz, {
                    margin: 1,
                    filename: `${title}.pdf`,
                });
            },
            async createDocx (quiz) {
                if (!process.client) return;

                const title = [new Paragraph({
                                                 children: [new TextRun({
                                                                            text: quiz.title,
                                                                            size: '26pt'
                                                                        }), new TextRun('\n\n\n')],
                                             })];

                const content = quiz.content.map(element => {
                    if (element.type === 'source') {
                        return new Paragraph({
                                                 children: [new TextRun('Zapoznaj się z materiałem pod adresem:\n\n'), new ExternalHyperlink({
                                                                                                                                                 children: [
                                                                                                                                                     new TextRun({
                                                                                                                                                                     text: element.url,
                                                                                                                                                                     style: "Hyperlink",
                                                                                                                                                                 }),
                                                                                                                                                 ],
                                                                                                                                                 link: element.url,
                                                                                                                                             }), new TextRun('\n\n\n')]
                                             });
                    }

                    if (element.type === 'query') {
                        return new Paragraph({
                                                 children: [new TextRun(element.text), new TextRun('\n\n'), new TextRun('Odpowiedź:\n'), new TextRun('\n\n\n')]
                                             });
                    }
                });

                let doc = new Document({
                                           sections: [
                                               {
                                                   properties: {},
                                                   children: [...title, ...content],
                                               }
                                           ]
                                       });

                const mimeType =
                    "application/vnd.openxmlformats officedocument.wordprocessingml.document";
                Packer.toBlob(doc).then((blob) => {
                    const docblob = blob.slice(0, blob.size, mimeType);
                    saveAs(docblob, `${quiz.title}.docx`);
                });
            }
        }
    }
</script>

<style>
    .list-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    td {
        padding: 8px;
    }

    td button {
        cursor: pointer;
    }
</style>
