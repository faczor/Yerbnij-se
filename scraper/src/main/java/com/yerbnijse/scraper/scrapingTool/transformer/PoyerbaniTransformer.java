package com.yerbnijse.scraper.scrapingTool.transformer;

import com.yerbnijse.scraper.scrapingTool.Transformer;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class PoyerbaniTransformer implements Transformer {

  @Override
  public Pair<String, Integer> extractFromTitle(String title) {
    ArrayList<String> list = new ArrayList<>(Arrays.asList(title.split(" ")));
    for (int i = 0; i < list.size(); i++) {
      if (list.get(i).equals(" ") || list.get(i).isBlank()) {
        list.remove(i);
        break;
      }
    }
    Integer amount = getAmount(list);
    return ImmutablePair.of(String.join(" ", list), amount);
  }

  @Override
  public Double extractPrice(String price) {
    return Double.parseDouble(price.replace(" zł / szt", "").replace(".", "").replace(",", "."));
  }

  private Integer getAmount(List<String> titleSplit) {
    try {
      Optional<String> optionalAmount = titleSplit.stream().filter(x -> x.contains("kg")).findFirst();
      if (optionalAmount.isPresent()) {
        String amount = optionalAmount.get();
        titleSplit.remove(amount);
        if (amount.length() == 2) {
          amount = titleSplit.get(titleSplit.size() - 1);
          titleSplit.remove(amount);
        }
        if (amount.contains(",")) {
          amount = amount.replace("kg", "").replace(" ", "").replace("0,", "");
          return Integer.parseInt(amount) * 100;
        } else {
          amount = amount.replace("kg", "").replace(" ", "").replace("0,", "");
          return Integer.parseInt(amount) * 1000;
        }
      } else {
        optionalAmount = titleSplit.stream().filter(x -> x.contains("0g")).findFirst();
        if (optionalAmount.isPresent()) {
          String amount = optionalAmount.get();
          titleSplit.remove(amount);
          amount = amount.replace("g", "").replace(" ", "");
          return Integer.parseInt(amount);
        }
      }
    } catch (NumberFormatException exception) {
      return null;
    }
    return null;
  }
}
