package com.yerbnijse.scraper.scrapingTool.transformer;

import com.yerbnijse.scraper.scrapingTool.Transformer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

public class UnMateTransformer implements Transformer {
  @Override
  public Pair<String, Integer> extractFromTitle(String title) {
    ArrayList<String> list = new ArrayList<>(Arrays.asList(title.split(" ")));
    Integer amount = getAmount(list);
    return ImmutablePair.of(String.join(" ", list)
        .replace("Yerba Mate", ""), amount);
  }

  private Integer getAmount(List<String> titleSplit) {
    try {
      Optional<String> optionalAmount =
          titleSplit.stream().filter(x -> x.contains("0g")).findFirst();
      if (optionalAmount.isPresent()) {
        String amount = optionalAmount.get();
        titleSplit.remove(amount);
        amount = amount.replace("g", "").replace(" ", "");
        return Integer.parseInt(amount);
      }
    } catch (NumberFormatException exception) {
      return null;
    }
    return null;
  }
}
