public class BuildAStringTransformer {
    public static void main(String[] args) {
        String originalString = "I love cats.";
        System.out.println("Original string:");
        System.out.println(originalString);

        String replacedString = originalString.replace("cats", "dogs");
        System.out.println("After using the replace() method:");
        System.out.println(replacedString);

        String exampleSentence = "I love cats and cats are so much fun!";
        System.out.println("Original sentence:");
        System.out.println(exampleSentence);

        String dogsOnlySentence = exampleSentence.replace("cats", "dogs");
        System.out.println("Replacing all occurrences of cats with dogs:");
        System.out.println(dogsOnlySentence);

        String learningSentence = "I love learning!";
        System.out.println("Original learning sentence:");
        System.out.println(learningSentence);

        String repeatedLove = "love ".repeat(3).trim();
        System.out.println(repeatedLove);

        String newSentence = "I " + repeatedLove + " learning.";
        System.out.println(newSentence);
    }
}