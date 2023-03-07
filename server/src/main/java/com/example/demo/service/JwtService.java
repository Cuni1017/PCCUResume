package com.example.demo.service;


import com.example.demo.config.error.FileException;
import com.example.demo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

  private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

    final Claims claims = extractAllClaims(token);

    return claimsResolver.apply(claims);
  }
  private Claims extractAllClaims(String token) {
    Claims Claims;

    try {
      Claims = Jwts
              .parserBuilder()
              .setSigningKey(getSignInKey())
              .build()
              .parseClaimsJws(token)
              .getBody();
    }catch(ExpiredJwtException e){
      Claims = e.getClaims();
    }
    return  Claims;
    //拆開jwt
  }
  public String generateToken(User user) {

    return generateToken(new HashMap<>(), user);
  }

  public String generateToken(
      Map<String, Object> extraClaims,
      User userDetails
  ) {
    extraClaims.put("username",userDetails.getUsername());
    extraClaims.put("id",userDetails.getId());
    extraClaims.put("role",userDetails.getRole());
    return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24*60*30))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String username = extractUsername(token);

    return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {

    if(extractExpiration(token).before(new Date())){
      throw new FileException("JWT時間過時了");
    }
    System.out.println(extractExpiration(token).before(new Date()));
    return extractExpiration(token).before(new Date());
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }



  private Key getSignInKey() {
    byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
