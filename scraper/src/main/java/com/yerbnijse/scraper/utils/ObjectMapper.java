package com.yerbnijse.scraper.utils;

public class ObjectMapper {
    public static Double stringToPrice(String input) {
        return Double.parseDouble(input.toUpperCase().split(" ZŁ")[0].replace(",", "."));
    }

    public static Integer stringToAmount(String input) {
        try {
            String[] split = input.toUpperCase().split(" ");
            for (int i = 0; i < split.length; i++) {
                if (split[i].contains("0G")) {
                    return Integer.parseInt(split[i].replace("G", ""));
                } else if (split[i].contains("KG")) {
                    String amount = split[i].replace("KG", "");
                    if (amount.isBlank()) {
                        return Integer.parseInt(split[i - 1]) * 1000;
                    }
                    return Integer.parseInt(amount) * 1000;
                }
            }
            System.out.println("Not found amount in: " + input);
            return null;
        } catch(NumberFormatException exception) {
            System.out.println("Wrong amount format: " + input);
            return null;
        }
    }
}
