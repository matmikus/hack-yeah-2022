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
                        <button @click="createPdf">
                            .pdf
                        </button>
                    </td>
                    <td>
                        <button @click="createDocx">
                            .docx
                        </button>
                    </td>
                    <td>
                        <button @click="sendToMein">
                            wyślij do MEiN
                        </button>
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
    import puppeteer from 'puppeteer';

    export default {
        computed: {
            list () {
                return this.$store.state.list;
            }
        },
        methods: {
            createPdf () {

                (async () => {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();

                    await page.goto('https://developers.google.com/web/');

                    // Type into search box.
                    await page.type('.devsite-search-field', 'Headless Chrome');

                    // Wait for suggest overlay to appear and click "show all results".
                    const allResultsSelector = '.devsite-suggest-all-results';
                    await page.waitForSelector(allResultsSelector);
                    await page.click(allResultsSelector);

                    // Wait for the results page to load and display the results.
                    const resultsSelector = '.gsc-results .gs-title';
                    await page.waitForSelector(resultsSelector);

                    // Extract the results from the page.
                    const links = await page.evaluate(resultsSelector => {
                        return [...document.querySelectorAll(resultsSelector)].map(anchor => {
                            const title = anchor.textContent.split('|')[0].trim();
                            return `${title} - ${anchor.href}`;
                        });
                    }, resultsSelector);

                    // Print all the files.
                    console.log(links.join('\n'));

                    await browser.close();
                })();
            },
            createDocx () {

            },
            sendToMein () {

            }
        }
    };
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

    td > button {
        cursor: pointer;
    }
</style>
