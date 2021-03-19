import 'dart:html';

void main() {
  if (window.location.search.split("&").length >= 3) redirect();
  AnchorElement generateButton = querySelector("#generateButton");

  generateButton.onClick.listen((event) {
    AnchorElement copyUrlTextButton = querySelector("#copyUrlTextButton");
    AnchorElement copyRedirectUrlTextButton = querySelector("#copyRedirectUrlTextButton");

    TextAreaElement urlTextArea = querySelector("#urlText");
    TextAreaElement redirectUrlTextArea = querySelector("#redirectUrlText");

    urlTextArea.text = generateUrlFromInput();
    redirectUrlTextArea.text = generateRedirectUrlFromInput();

    urlTextArea.style.display = "";
    redirectUrlTextArea.style.display = "";
    copyUrlTextButton.style.display = "";
    copyRedirectUrlTextButton.style.display = "";

    copyUrlTextButton.onClick.listen((_) => copyText(urlTextArea.text));
    copyRedirectUrlTextButton.onClick.listen((_) => copyText(redirectUrlTextArea.text));
  });
}

void copyText(String copyText) {
  DivElement copyTextElement = DivElement();

  copyTextElement.append(PreElement()).text = copyText;
  document.body.append(copyTextElement);

  window.getSelection().selectAllChildren(copyTextElement);
  document.execCommand('copy');

  copyTextElement.remove();
}

String generateUrl(String name, String ip, String port) {
  return "https://suinua.github.io/AddExternalServer/?name=${name}&ip=${ip}&port=${port}";
}


String generateUrlFromInput() {
  TextInputElement nameElement = querySelector("#name");
  TextInputElement ipElement = querySelector("#ip");
  TextInputElement portElement = querySelector("#port");

  return generateUrl(nameElement.value, ipElement.value, portElement.value);
}

String generateRedirectUrlFromInput() {
  TextInputElement nameElement = querySelector("#name");
  TextInputElement ipElement = querySelector("#ip");
  TextInputElement portElement = querySelector("#port");

  return generateRedirectUrl(nameElement.value, ipElement.value, portElement.value);
}

void redirect() {
  var url = window.location.search.substring(1).split("&");

  Map<String, String> urlAsMap = {};
  url.forEach((element) {
    var elementAsList = element.split("=");
    urlAsMap[elementAsList[0]] = elementAsList[1];
  });

  var name = urlAsMap["name"];
  var ip = urlAsMap["ip"];
  var port = urlAsMap["port"];

  window.location.href = generateRedirectUrl(name, ip, port);
}

String generateRedirectUrl(String name, String ip, String port) {
  return "minecraft:?addExternalServer=${name}|${ip}:${port}";
}
