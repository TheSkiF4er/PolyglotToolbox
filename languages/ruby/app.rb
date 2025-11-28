require 'sinatra'
require 'json'
require 'digest'

post '/stats' do
  data = JSON.parse(request.body.read)
  text = (data['text'] || '').downcase
  words = text.scan(/\b[0-9a-zа-яё']+\b/)
  counts = words.each_with_object(Hash.new(0)) { |w,h| h[w]+=1 }
  top = counts.sort_by{|k,v|-v}.first(5).map{|k,v| {'word'=>k,'count'=>v}}
  {'words'=>words.length, 'top'=>top, 'sha256'=>Digest::SHA256.hexdigest(text)}.to_json
end

get '/health' do {'status'=>'ok'}.to_json end

get '/fib' do
  n = (params['n'] || 10).to_i
  fib = lambda{|n| n<2 ? n : fib.call(n-1) + fib.call(n-2)}
  {'n'=>n, 'value'=>fib.call(n)}.to_json
end
