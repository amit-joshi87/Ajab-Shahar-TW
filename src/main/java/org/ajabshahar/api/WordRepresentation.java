package org.ajabshahar.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WordRepresentation {
    private int id;
    private String wordOriginal;
    private String wordTranslation;
    private String wordTransliteration;
    private String wordIntroSummaryOriginal;
    private String wordIntroSummaryTranslation;
    private String wordIntroSummaryTransliteration;
    private String WordIntroOriginal;
    private String WordIntroTranslation;
    private String wordIntroTransliteration;

    public WordRepresentation(int id, String wordOriginal, String wordTranslation, String wordTransliteration, String wordIntroSummaryOriginal, String wordIntroSummaryTranslation, String wordIntroSummaryTransliteration, String wordIntroOriginal, String wordIntroTranslation, String wordIntroTransliteration) {
        this.id = id;
        this.wordOriginal = wordOriginal;
        this.wordTranslation = wordTranslation;
        this.wordTransliteration = wordTransliteration;
        this.wordIntroSummaryOriginal = wordIntroSummaryOriginal;
        this.wordIntroSummaryTranslation = wordIntroSummaryTranslation;
        this.wordIntroSummaryTransliteration = wordIntroSummaryTransliteration;
        WordIntroOriginal = wordIntroOriginal;
        WordIntroTranslation = wordIntroTranslation;
        this.wordIntroTransliteration = wordIntroTransliteration;
    }

    @JsonProperty("id")
    public int getId() {
        return id;
    }

    @JsonProperty("wordOriginal")
    public String getWordOriginal() {
        return wordOriginal;
    }

    @JsonProperty("wordTranslation")
    public String getWordTranslation() {
        return wordTranslation;
    }

    @JsonProperty("wordTransliteration")
    public String getWordTransliteration() {
        return wordTransliteration;
    }

    @JsonProperty("wordIntroOriginal")
    public String getWordIntroOriginal() {
        return WordIntroOriginal;
    }

    @JsonProperty("wordIntroTranslation")
    public String getWordIntroTranslation() {
        return WordIntroTranslation;
    }

    @JsonProperty("wordIntroTransliteration")
    public String getWordIntroTransliteration() {
        return wordIntroTransliteration;
    }

    @JsonProperty("introSummaryOriginal")
    public String getWordIntroSummaryOriginal() {
        return wordIntroSummaryOriginal;
    }

    @JsonProperty("introSummaryTranslation")
    public String getWordIntroSummaryTranslation() {
        return wordIntroSummaryTranslation;
    }

    @JsonProperty("introSummaryTransliteration")
    public String getWordIntroSummaryTransliteration() {
        return wordIntroSummaryTransliteration;
    }
}