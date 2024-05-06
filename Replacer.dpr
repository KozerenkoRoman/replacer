program Replacer;

{$APPTYPE CONSOLE}
{$R *.res}

{$REGION 'Region uses'}
uses
  System.SysUtils, System.Types, System.Classes, System.IOUtils, Utils.CmdParser in 'Utils.CmdParser.pas';
{$ENDREGION}

procedure WriteHelp;
begin
  Writeln('');
  Writeln('replacer.exe [-templates="d:\templates"] [-results="d:\results"] [var="replacer.ini"]');
  Writeln('or');
  Writeln('replacer.exe -help');
  Writeln('');
  Writeln('templates - directory with templates');
  Writeln('results   - directory with results');
  Writeln('var       - file with variable`s list');
  Flush(Output);
end;

var
  resultsDir   : string = 'results';
  tempatesDir  : string = 'templates';
  variableFile : string;

begin
  variableFile := TPath.ChangeExtension(ParamStr(0), '.txt');

  var CmdParser := TCmdParser.Create;
  try
    tempatesDir  := CmdParser.AsString('templates', tempatesDir);
    resultsDir   := CmdParser.AsString('results', resultsDir);
    variableFile := CmdParser.AsString('var', variableFile);
    if CmdParser.Exists('?') or CmdParser.Exists('help') or CmdParser.Exists('h') then
    begin
      WriteHelp;
      Halt(0);
    end;
  finally
    FreeAndNil(CmdParser);
  end;

  if not TDirectory.Exists(tempatesDir) then
  begin
    Writeln('Error: directory "' + tempatesDir + '" is not exists!');
    Halt(0);
  end
  else if not TDirectory.Exists(resultsDir) then
    try
      TDirectory.CreateDirectory(resultsDir);
    except
      Writeln('Error: Failed to create "' + resultsDir + '" directory "');
      Halt(0);
    end;

  var VariableList := TStringList.Create;
  try
    VariableList.LoadFromFile(variableFile);
    if (VariableList.Count = 0) then
    begin
      Writeln('Error: variable list is empty!');
      Halt(0);
    end;

    try
      Writeln('');
      var templates: TStringDynArray := TDirectory.GetFiles(tempatesDir);

      for var templ in templates do
      begin
        var content := TFile.ReadAllText(templ);
        var resultFile: string := TPath.Combine(resultsDir, TPath.GetFileName(templ));

        for var i := 0 to VariableList.Count - 1 do
        begin
          var name := VariableList.Names[i].Trim;
          var value := VariableList.ValueFromIndex[i].Trim;
          resultFile := resultFile.Replace(name, value);
          content := content.Replace(name, value);
        end;
        TFile.WriteAllText(resultFile, content);

        Writeln('============================ File "' + resultFile +'" ============================');
        Writeln(content);
        Writeln('');
      end;

    except
      on E: Exception do
      begin
        Writeln('An error occurred:');
        Writeln(E.Message);
      end;
    end;
  finally
    FreeAndNil(VariableList)
  end;

end.
